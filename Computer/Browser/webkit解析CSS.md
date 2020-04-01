
# webkit解析css的过程

## 浏览器解析六部曲 
浏览器解析页面主要分为六个步骤，如下：

![六部曲.png](https://i.loli.net/2019/07/07/5d21ae948bb1e28798.png)

我们先看前三个步骤，解析DOM树和CSSOM树，然后何合成render树。

![render.png](https://i.loli.net/2019/07/07/5d21b1387abc946683.png)

之后再进行布局，绘制，合成。在这个过程中，我们来看看我们平常写的css样式代码是怎么解析的。

### CSSStyleSheets

分析之前，我们先看一个对象，CSSStyleSheets，方便我们后面理解。

* CSSStyleSheets是CSSOM定义的样式表接口，可以在js中访问，通过该接口，开发者可以通过js获取样式表的各种信息。例如`type` `cssRules` 规则信息等。
* 可以通过`document.styleSheets`访问到CSSStyleSheets。
* `styleSheets`是CSSOM对DOM中`document`接口进行了扩展，让我们可以访问。
* 页面`document.styleSheets`对象是一个`StyleSheetList`类数组对象，里面包含页面所有样式


以下示例代码：

```html
<html>
  <body>
    <style type="text/css">
        div {margin:5px;color:black}
        .err {color:red}
        .big {margin-top:3px}
        div span {margin-bottom:4px}
        #div1 {color:blue}
        #div2 {color:green}
    </style>
    <div class="err" id="div1">
      <p>
        this is a <span class="big"> big error </span>
        this is also a
        <span class="big"> very  big  error</span> error
      </p>
    </div>
    <div class="err" id="div2">another error</div>
  </body>
</html>
```


![st<x>yleSheets.png](https://i.loli.net/2019/07/07/5d21b1612a21c50466.png)

通过styleSheets我们可以看到以下几个信息：
* 页面css经过解析之后生成CSSOM树中，多少个style标签在`StyleSheetList`对象中对应几条规则
* 按照先后顺序，`StyleSheetList`先插入的是开发样式，其次用浏览器用户样式，最后面的规则是浏览器默认样式，优先级最低。
* 每一条rule都有一个`disable`属性，控制该rule时候生效。
* css样式解析生成rules之后存储在`cssText`对象上
* 在单条style规则中，rule组成由 `cssText`，`style`,`selectorText`,`parentStyleSheet`等对象组成，供开发者访问操作。

两个问题：

1. 我们在通过JS对元素样式操作`document.getElementById(‘div1’).style`,获取的是什么。
2. `Document.getElementById(‘div1’).style.color='red'` 操作的是什么。

![elementst<x>yle.png](https://i.loli.net/2019/07/07/5d21b15ce0ddd21919.png)

* 返回的是一个`CSSStyleDeclaration`集合，和上面rules中的style对象是同一种类型，里面存储了所有css属性的值，没有添加样式的都为空。
* 每一个element上都有style接口。
* 通过JS操作style，修改了的是该元素`CSSStyleDeclaration`集合中css属性的值，相当于行内样式


## webkit解析

解析主流程

> ![main-parser.png](https://i.loli.net/2019/07/07/5d21b1c4a668466837.png)
> 图片来源：《webkit技术内幕》



解析主要由一个CSSParser来处理，CSSParser实际上是一个桥接类，中间调用了`CSSGrammer.y.in`来，在该类中，使用了[ Flex 和 Bison ](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Webkit_CSS_parser)解析器生成器， 这个两个解释器非常有名，

* Flex( fast lexical analyzer generator,快速词法分析器生成器)的输入是包含标记的正则表达式定义的文件，也就是我们的css, 输出是符合正则的结果,代码主要是c++或者c，主要用来解析词法。
* Bison 的输入是采用 BNF(巴科斯范式) 格式的语言语法规则。

可以把他们两个看做编译器的核心。HTML的DOM树也是使用这两个解释器解析的。更详细的词法语法解析参考 [CSS词法语法解析](https://www.w3.org/TR/CSS2/grammar.html)

一个借鉴来的例子说明：

词法语法（词汇）是针对各个标记用正则表达式定义的：

```
comment   \/\*[^*]*\*+([^/*][^*]*\*+)*\/
num   [0-9]+|[0-9]*"."[0-9]+
nonascii  [\200-\377]
nmstart   [_a-z]|{nonascii}|{escape}
nmchar    [_a-z0-9-]|{nonascii}|{escape}
name    {nmchar}+
ident   {nmstart}{nmchar}*
```
“ident”是标识符 (identifier) 的缩写，比如类名。“name”是元素的 ID（通过“#”来引用）。

语法是采用 BNF 格式描述的。


```
ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
selector
  : simple_selector [ combinator selector | S+ [ combinator? selector ]? ]?
  ;
simple_selector
  : element_name [ HASH | class | attrib | pseudo ]*
  | [ HASH | class | attrib | pseudo ]+
  ;
class
  : '.' IDENT
  ;
element_name
  : IDENT | '*'
  ;
attrib
  : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*
    [ IDENT | STRING ] S* ] ']'
  ;
pseudo
  : ':' [ IDENT | FUNCTION S* [IDENT S*] ')' ]
  ;
```

解释过程：

```
.error  {
  color:red;
}
```
`.error` 是选择器。通过ruleset进行解析，先解析selector, 匹配到是class，然后开始判断时候通过分割符`,`选择是否能解析到多个选择器，`.error`只有一个选择器，接下来匹配闭合大括号`{}`，解析到一个或多个值，这里解析到`color: red;`，`.error`选择器解析结束。


解释的过程比较复杂，可以看出，从解释器中可以看到，有使用function来解释语法的。在css属性中有function，例如rgb，calc等，会调用FunctionToken进行处理，很明显，使用16位色值性能会比rgb要好一点，不过浏览器已经在将这个性能消耗降得越来越低。

webkit使用Bison会创建自下而上的移位归约解析器。顺带插一脚，Firefox使用的是人工编写的自上而下的解析器。这两种解析器都会将 CSS 文件解析成 StyleSheet 对象，且每个对象都包含 CSS 规则。CSS 规则对象则包含选择器和声明对象，以及其他与 CSS 语法对应的对象。

> ![bison-to-cssst<x>yleSheets.png](https://i.loli.net/2019/07/07/5d21b15b0668126563.png)

解析过程最后结果得到一个规则集Rules。

最后会把解析出来的Rule集合放到四个类型的HashMap中。

map的区分是根据**最右边的selector**的类型：id、class、标签、伪类选择器区分的，这样做的目的是为了在比较的时候能够很快地取出匹配第一个选择器的所有rule，然后每条rule再检查它的下一个selector是否匹配当前元素。

```
CompactRuleMap m_idRules;
CompactRuleMap m_classRules;
CompactRuleMap m_tagRules;
CompactRuleMap m_shadowPseudoElementRules;
```


## RenderTree

DOM + CSSOM => RenderTree  可视化元素按照其显示顺序而组成的树，文档可视化的表示。内部使用**RenderObject**类实现。定义如下：

```
class RenderObject{
  virtual void layout();
  virtual void paint(PaintInfo);
  virtual void rect repaintRect();
  Node* node;  //the DOM node
  RenderStyle* style;  // the computed style
  RenderLayer* containgLayer; //the containing z-index layer
}
```


```
RenderObject* RenderObject::createObject(Node* node, RenderStyle* style)
{
    Document* doc = node->document();
    RenderArena* arena = doc->renderArena();
    ...
    RenderObject* o = 0;

    switch (style->display()) {
        case NONE:
            break;
        case INLINE:
            o = new (arena) RenderInline(node);
            break;
        case BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case INLINE_BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case LIST_ITEM:
            o = new (arena) RenderListItem(node);
            break;
       ...
    }

    return o;
}
```

每一个Node节点调用RenderObject类都代表了一个矩形区域，对应该节点的CSS框（类似盒子模型）, 这个CSS框会因为`display`属性的不同受到影响，因此在webkit中会判断display的值，创建不同的呈现器。

创建呈现器的一些规则：
* 非可视化的 DOM 元素不会插入呈现树中，列入`head`元素，display为none的元素
* 格式无效的HTML，会容错处理。 例如inline 元素只能包含 block 元素或 inline 元素中的一种。如果出现了混合内容，则应创建匿名的 block 呈现器，以包裹 inline 元素。
* 一个元素节点对应多个可视化对象，一般针对复杂结构的元素，会创建多个呈现器，分别呈现。
* 呈现对象对应的DOM 节点，与在DOM树中节点所在的位置不同，会使用占位框架保留并映射到真正框架。例如 `position: absolute` `float`属性，在正常流程之外，原位置使用占位框架，呈现内容放置在树中其他位置，映射到真实框架。


![renderob<x>ject.png](https://i.loli.net/2019/07/07/5d21b15f6c7ad22820.png)


在创建renderTree流程中，遇到html 和 body 标记就会构建呈现树根节点，作为最上层的block，包含了所有的block，他的尺寸就是窗口大小，Viewport。


### 样式计算
计算所有样式来源的样式（包括浏览器的默认样式表、由网页作者提供的样式表以及由浏览器用户提供的用户样式表）、inline 样式元素和 HTML 中的可视化属性（将转化为CSS样式属性）。

难点：
1. 数据量大。样式结构十分庞大，可能会造成内存泄露
2. 性能问题。选择器具有非常复杂的结构，需要遍历整个规则列表来寻找匹配规则，这就会导致某个匹配过程一开始看起来很可能是正确的，但最终发现其实是徒劳的，必须尝试其他匹配路径。
3. 应用规则可能有非常复杂的层叠

解决方案（摘录）：

* 共享样式数据。 同一级下不同节点共享样式数据
  * 具有严格的规则，必须满足一下规则。
  1. 这些元素必须处于相同的鼠标状态（例如，不允许其中一个是“:hover”状态，而另一个不是）
  2. 任何元素都没有 ID
  3. 标记名称应匹配
  4. 类属性应匹配
  5. 映射属性的集合必须是完全相同的
  6. 链接状态必须匹配
  7. 焦点状态必须匹配
  8. 任何元素都不应受属性选择器的影响，这里所说的“影响”是指在选择器中的任何位置有任何使用了属性选择器的选择器匹配
  9. 元素中不能有任何 inline 样式属性
  10. 不能使用任何同级选择器。WebCore 在遇到任何同级选择器时，只会引发一个全局开关，并停用整个文档的样式共享（如果存在）。这包括 + 选择器以及 :first-child 和 :last-child 等选择器。
* 结构划分
  * 根据属性划分不同的结构
* 使用规则树计算样式上下文

对于第二个问题，在css解析的过程中，最后将rules添加到hashMap中，这样处理之后就可以大大简化了规则匹配，这种方法可以排除95%以上的规则。

简单一点来讲的话，样式计算其实就是要做两步工作，找到命中的选择器， 然后设置样式

### 命中选择器

以一个简单的例子说明：

```
<style>
.text{
    font-size: 22em;
}
.text p{
    color: #505050;
}
</style>
<div class="text">
    <p>hello, world</p>
</div>
```

上面会生成两个rule，第一个rule会放到上面提到的四个hashMap其中的classRules里面，而第二个rule会放到tagRules里面。

然后开始从document开始进行深度遍历，对于每一个节点，代码里面会依次按照id、class、伪元素、标签的顺序取出所有的selector，进行比较判断，最后是通配符，如下：


```
//如果结点有id属性
if (element.hasID()) 
  collectMatchingRulesForList(
      matchRequest.ruleSet->idRules(element.idForStyleResolution()),
      cascadeOrder, matchRequest);
//如果结点有class属性
if (element.isStyledElement() && element.hasClass()) { 
  for (size_t i = 0; i < element.classNames().size(); ++i)
    collectMatchingRulesForList(
        matchRequest.ruleSet->classRules(element.classNames()[i]),
        cascadeOrder, matchRequest);
}
//伪类的处理
...
//标签选择器处理
collectMatchingRulesForList(
    matchRequest.ruleSet->tagRules(element.localNameForSelectorMatching()),
    cascadeOrder, matchRequest);
//最后是通配符
...
```
上面domo的rule只有两个，一个是classRule，一个是tagRule。所以会对取出来的这个classRule进行检验：

```
if (!checkOne(context, subResult))
  return SelectorFailsLocally;
if (context.selector->isLastInTagHistory()) { 
    return SelectorMatches;
}
```
第一行先对当前选择器(.text)进行检验，如果不通过，则直接返回不匹配，如果通过了，第三行判断当前选择器是不是最左边的选择器，如果是的话，则返回匹配成功。如果左边还有限定的话，那么再递归检查左边的选择器是否匹配。

checkOne执行过程：

```
switch (selector.match()) { 
  case CSSSelector::Tag:
    return matchesTagName(element, selector.tagQName());
  case CSSSelector::Class:
    return element.hasClass() &&
           element.classNames().contains(selector.value());
  case CSSSelector::Id:
    return element.hasID() &&
           element.idForStyleResolution() == selector.value();
}
```

很明显，.text将会在上面第6行匹配成功，并且它左边没有限定了，所以返回匹配成功。

到了检验p标签的时候，会取出”.text p”的rule，它的第一个选择器是p，将会在上面代码的第3行判断成立。但由于它前面还有限定，于是它还得继续检验前面的限定成不成立。

前一个选择器的检验关键是靠当前选择器和它的关系，解析器一开始的定义了几种relationType，这里的p的relationType是Descendant即后代。上面在调了checkOne成功之后，继续往下走：


```
enum RelationType {
    SubSelector,       // No combinator
    Descendant,        // "Space" combinator
    Child,             // > combinator
    DirectAdjacent,    // + combinator
    IndirectAdjacent,  // ~ combinator
    // Special cases for shadow DOM related selectors.
    ShadowPiercingDescendant,  // >>> combinator
    ShadowDeep,                // /deep/ combinator
    ShadowPseudo,              // ::shadow pseudo element
    ShadowSlot                 // ::slotted() pseudo element
  };
```


```
switch (relation) { 
  case CSSSelector::Descendant:
    for (nextContext.element = parentElement(context); nextContext.element;
         nextContext.element = parentElement(nextContext)) { 
      MatchStatus match = matchSelector(nextContext, result);
      if (match == SelectorMatches || match == SelectorFailsCompletely)
        return match;
      if (nextSelectorExceedsScope(nextContext))
        return SelectorFailsCompletely;
    } 
    return SelectorFailsCompletely;
      case CSSSelector::Child:
    //...
}
```
由于这里是一个后代选择器，所以它会循环当前元素所有父结点，用这个父结点和第二个选择器”.text”再执行checkOne的逻辑，checkOne将返回成功，并且它已经是最后一个选择器了，所以判断结束，返回成功匹配。

所以不提倡把选择器写得太长，特别是用sass/less写的时候，新手很容易写嵌套很多层，这样会增加查找匹配的负担。例如上面，它需要对下一个父代选器启动一个新的递归的过程，而递归是一种比较耗时的操作。一般是不要超过三层。


### 设置样式
样式表可能有多个，层叠顺序在 CSS2 规范如下，按照从低到高排序

1. 浏览器声明
2. 用户普通声明
3. 作者普通声明
4. 作者重要声明
5. 用户重要声明

每一步如果有styleRule匹配成功的话会把它放到当前元素的m_matchedRules的向量里面，并会去计算它的优先级，记录到m_specificity变量。这个优先级是怎么算的呢？



优先级计算按照选择器的特异性排序，在[CSS2规范](https://www.w3.org/TR/CSS2/cascade.html#specificity)中定义如下：

* 如果声明来自于“style”属性，而不是带有选择器的规则，则记为 1，否则记为 0 (= a)
* 记为选择器中 ID 属性的个数 (= b)
* 记为选择器中其他属性和伪类的个数 (= c)
* 记为选择器中元素名称和伪元素的个数 (= d)

将四个数字按 a-b-c-d 这样连接起来（位于大数进制的数字系统中），构成特异性。


```
 *             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
 li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
 li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
 h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
 ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
 li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
 #x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
 style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
```

还有一种说法是按照如下定义计算的，webkit里面源码就是按照这样类似的方法计算的。

```
switch (m_match) {
    case Id: 
      return 0x010000;
    case PseudoClass:
      return 0x000100;
    case Class:
    case PseudoElement:
    case AttributeExact:
    case AttributeSet:
    case AttributeList:
    case AttributeHyphen:
    case AttributeContain:
    case AttributeBegin:
    case AttributeEnd:
      return 0x000100;
    case Tag:
      return 0x000001;
    case Unknown:
      return 0;
  }
  return 0;
}
```

```
for (const CSSSelector* selector = this; selector;
     selector = selector->tagHistory()) { 
  temp = total + selector->specificityForOneSelector();
}
return total;
```

一个选择器例子说明

```
/*优先级为257 = 265 + 1*/
.text h1{
    font-size: 8em;
}
 
/*优先级为65537 = 65536 + 1*/
#my-text h1{
    font-size: 16em;
}
```
其中id的优先级为0x10000 = 65536，类、属性、伪类的优先级为0x100 = 256，标签选择器的优先级为1。如下面计算所示：



当match完了当前元素的所有CSS规则，全部放到了collector的m_matchedRules里面，再把这个向量根据优先级从小到大排序：

```
collector.sortAndTransferMatchedRules();
```
WebKit对于较小的列表会使用冒泡排序，而对较大的列表则使用归并排序

```
static inline bool compareRules(const MatchedRule& matchedRule1,
                                const MatchedRule& matchedRule2) {
  unsigned specificity1 = matchedRule1.specificity();
  unsigned specificity2 = matchedRule2.specificity();
  if (specificity1 != specificity2)
    return specificity1 < specificity2;
 
  return matchedRule1.position() < matchedRule2.position();
}
```

先按优先级，如果两者的优先级一样，则比较它们的位置。

内联style的优先级又是怎么处理的呢？

把css表的样式处理完了之后，blink再去取style的内联样式（这个在已经在构建DOM的时候存放好了），把内联样式push_back到上面排好序的容器里，由于它是由小到大排序的，所以放最后面的优先级肯定是最大的


```
collector.addElementStyleProperties(state.element()->inlineStyle(),
                                        isInlineStyleCacheable);
```


样式里面的important的优先级又是怎么处理的？

所有的样式规则都处理完毕，最后就是按照它们的优先级计算CSS了。将在下面这个函数执行：

```
applyMatchedPropertiesAndCustomPropertyAnimations(
        state, collector.matchedResult(), element);
```

这个函数会按照下面的顺序依次设置元素的style：

```
applyMatchedProperties<HighPropertyPriority, CheckNeedsApplyPass>(
      state, matchResult.allRules(), false, applyInheritedOnly, needsApplyPass);
  for (auto range : ImportantAuthorRanges(matchResult)) {
    applyMatchedProperties<HighPropertyPriority, CheckNeedsApplyPass>(
        state, range, true, applyInheritedOnly, needsApplyPass);
  }
```

先设置正常的规则，最后再设置important的规则。所以越往后的设置的规则就会覆盖前面设置的规则。


按优先级计算出来的Style会被放在一个ComputedStyle的对象里面，这个style里面的规则分成了几类，通过检查style对象可以一窥

> ![cumputed.jpg](https://i.loli.net/2019/07/07/5d21b2635a10448713.jpg)

> ![Computedst<x>yle.png](https://i.loli.net/2019/07/07/5d21b2889c92379095.png)

结果分析：

* 具体来说，上面设置的font-size为：22em * 16px = 352px：

> ![computed-font-result.jpg](https://i.loli.net/2019/07/07/5d21b15c0d0dc23858.jpg)

* 所有的色值会变成16进制的整数
* 同时blink对rgba色值的转化算法：
    
```
RGBA32 makeRGBA32FromFloats(float r, float g, float b, float a) {
  return colorFloatToRGBAByte(a) << 24 | colorFloatToRGBAByte(r) << 16 |
         colorFloatToRGBAByte(g) << 8 | colorFloatToRGBAByte(b);
}
```

从这里可以看到，有些CSS优化建议说要按照下面的顺序书写CSS规则：

1. 位置属性(position, top, right, z-index, display, float等)
2. 大小(width, height, padding, margin)
3. 文字系列(font, line-height, letter-spacing, color- text-align等)
4. 背景(background, border等)
5. 其他(animation, transition等)

这些顺序对浏览器来说其实是一样的，因为最后都会放到computedStyle里面，而这个style里面的数据是不区分先后顺序的。所以这种建议与其说是优化，倒不如说是规范，大家都按照这个规范写的话，看CSS就可以一目了然，可以很快地看到想要了解的关键信息。

### render进程
插一句题外话，样式表的模型和DOM树解析是不同的模型，应用样式表的过程似乎没必要停止文档解析。然而事实并不是这样。

* Firefox 在样式表加载和解析的过程中，会禁止所有脚本。
* 而对于 WebKit 而言，仅当脚本尝试访问的样式属性可能受尚未加载的样式表影响时，它才会禁止该脚本。

原因： 脚本在文档解析阶段会请求样式信息。如果当时还没有加载和解析样式，脚本就会获得错误的回复，这样显然会产生很多问题

![recalculate.png](https://i.loli.net/2019/07/07/5d21b15e7b03760084.png)

## layout布局

假设有以下html/css：

```html
<div style="border:1px solid #000; width:50%; height: 100px; margin: 0 auto"></div>
```

这在浏览器上面将显示一个框：

![image](https://pic2.zhimg.com/v2-c2ae88baef95dd3f4422d15979902081_r.jpg)

为了画出这个框，首先要知道从哪里开始画、画多大，其次是边缘的颜色，就可以把它画出来了：

为了能够获取到具体的值，就得进行layout。什么叫layout？把css值转化成维度位置等可直接用来描绘的信息的过程就叫layout，如下Chrome源码对layout的解释：

```
// The purpose of the layout tree is to do layout (aka reflow) 
// and store its results for painting and hit-testing. 
// Layout is the process of sizing and positioning Nodes on the page.

// 布局树的目的是进行布局（也称为回流）并将其结果存储在绘画和hit-testing. 
// 布局是在页面上调整和定位节点的过程。
```

#### 计算layout值

在上面通过render计算，我们拿到了computedStyle对象，保存着css信息

![image](https://pic2.zhimg.com/80/v2-2be31393571ba590eb404f032ac6df35_hd.png)

计算layout值之前，需要创建layout树，对于每个非`display:none/contents`的Node结点都会相应地创建一个LayoutObject,并建立响应节点的父子关系。


```
LayoutObject* newLayoutObject = m_node->createLayoutObject(style);
parentLayoutObject->addChild(newLayoutObject, nextLayoutObject);
```

#### 计算宽度
宽度的计算是根据数值的类型：

```
switch (length.type()) {
  case Fixed:
    return LayoutUnit(length.value());
  case Percent:
    // Don't remove the extra cast to float. It is needed for rounding on
    // 32-bit Intel machines that use the FPU stack.
    return LayoutUnit(
        static_cast<float>(maximumValue * length.percent() / 100.0f));
}
```

如上所示，如果是Fixed，则直接返回一个LayoutUnit封装的数据的。

如果是Percent百分比，则用百分比乘以最大值，而这个最大值是用容器传进来的宽度。


#### 计算margin
margin有一个特殊的值，auto，webkit会检测marginLeft和marginRight是否都为auto，如果是的话，就认为元素居中


```
// CSS 2.1: "If both 'margin-left' and 'margin-right' are 'auto', their used
// values are equal. This horizontally centers the element with respect to
// the edges of the containing block."
const ComputedStyle& containingBlockStyle = containingBlock->styleRef();
if (marginStartLength.isAuto() && marginEndLength.isAuto()) {
  LayoutUnit centeredMarginBoxStart = std::max(
      LayoutUnit(),
      (availableWidth - childWidth) / 2); 
  marginStart = centeredMarginBoxStart;
  marginEnd = availableWidth - childWidth - marginStart;
  return;
}
```
上面第8行用容器的宽度减掉本身的宽度，然后除以2就得到margin-left，接着用容器的宽度减掉本身的宽度和margin-left就得到margin-right


margin和width算好了，便把它放到layoutObject结点的盒模型数据结构里面：


m_frameRect.setWidth(width);

m_marginBoxOutsets.setStart(marginLeft);


#### 盒模型数据结构

这个一定要贴出来，源码注释里面，很形象地画出了盒模型图，而且还把滚动条都画出来了


```
// ***** THE BOX MODEL *****
// The CSS box model is based on a series of nested boxes:
// http://www.w3.org/TR/CSS21/box.html
//
//       |----------------------------------------------------|
//       |                                                    |
//       |                   margin-top                       |
//       |                                                    |
//       |     |-----------------------------------------|    |
//       |     |                                         |    |
//       |     |             border-top                  |    |
//       |     |                                         |    |
//       |     |    |--------------------------|----|    |    |
//       |     |    |                          |    |    |    |
//       |     |    |       padding-top        |####|    |    |
//       |     |    |                          |####|    |    |
//       |     |    |    |----------------|    |####|    |    |
//       |     |    |    |                |    |    |    |    |
//       | ML  | BL | PL |  content box   | PR | SW | BR | MR |
//       |     |    |    |                |    |    |    |    |
//       |     |    |    |----------------|    |    |    |    |
//       |     |    |                          |    |    |    |
//       |     |    |      padding-bottom      |    |    |    |
//       |     |    |--------------------------|----|    |    |
//       |     |    |                      ####|    |    |    |
//       |     |    |     scrollbar height ####| SC |    |    |
//       |     |    |                      ####|    |    |    |
//       |     |    |-------------------------------|    |    |
//       |     |                                         |    |
//       |     |           border-bottom                 |    |
//       |     |                                         |    |
//       |     |-----------------------------------------|    |
//       |                                                    |
//       |                 margin-bottom                      |
//       |                                                    |
//       |----------------------------------------------------|
//
// BL = border-left
// BR = border-right
// ML = margin-left
// MR = margin-right
// PL = padding-left
// PR = padding-right
// SC = scroll corner (contains UI for resizing (see the 'resize' property)
// SW = scrollbar width
```
这个盒模型border及其以内区域是用一个LayoutRect m_frameRect对象表示的，上面计算的宽高就保存在这个对象里面

#### 位置计算

位置计算就是要算出x和y或者说left和top的值，这两个值分别在下面两个函数计算得到：


```
// Now determine the correct ypos based off examination of collapsing margin
// values.
LayoutUnit logicalTopBeforeClear =
    collapseMargins(child, layoutInfo, childIsSelfCollapsing,
                    childDiscardMarginBefore, childDiscardMarginAfter);
// Now place the child in the correct left position
determineLogicalLeftPositionForChild(child);
```

* 递归计算的过程 子元素再到父元素
* 浮动元素的计算特别复杂

这里有个问题，为什么它要递归地算，即先算子元素的再回过头来算父元素呢？因为有些属性必须得先知道子元素的才能知道父元素，例如父元素的高度是子元素撑起的，但是有些属性要先知道父元素的才能算子元素的，例如子元素的宽度是父元素的50%。所以在计算子元素之前会先把当前元素的layout计算一下，然后再传给子元素，子元素计算好之后会返回父元素是否需要重新layout，


## paint

### 画图引擎 [Skia](https://skia.org/index_zh)

Skia是一个开源的二维图形库，提供各种常用的API，并可在多种软硬件平台上运行。谷歌Chrome浏览器、Chrome OS、安卓、火狐浏览器、火狐操作系统以及其它许多产品都使用它作为图形引擎。

Skia由谷歌出资管理，任何人都可基于BSD免费软件许可证使用Skia。Skia开发团队致力于开发其核心部分， 并广泛采纳各方对于Skia的开源贡献。


Paint的初始化会使用layout的数据，如下面的BoxPainter的构造函数：

```
BoxPainter(const LayoutBox& layoutBox) : m_layoutBox(layoutBox) {}
```

 
 
 这个SkCanvas和JS里面的canvas有什么联系和区别？

Blink JS里的canvas就是这个canvas，当在js里面获取canvas对象进行描绘时：

```
var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 100, 100)
```

就会去获取SkCanvas实例。

```
SkCanvas* HTMLCanvasElement::drawingCanvas() const {
  return buffer() ? m_imageBuffer->canvas() : nullptr;
}
```

所以不管是用html/css画，还是用canvas画，它们都是同宗同源的，区别就在于借助html/css比较直观简单，浏览器帮你进行layout。而直接用canvas就得从点线面一点一点地去画，但同时它的灵活度就比较大。

## composite

先说几个概念熟悉一下

LayoutObjects -> PaintLayers -> GraphicsLayers

**LayoutObjects**

DOM 树中每个 Node 节点都有一个对应的 LayoutObject 。LayoutObject 知道如何在屏幕上 paint Node 的内容。

**PaintLayers**

拥有相同的坐标空间的 LayoutObjects，属于同一个渲染层（PaintLayer）。

1. NormalPaintLayer

    - 根元素（HTML）
    - 有明确的定位属性（relative、fixed、sticky、absolute）
    - 透明的（opacity 小于 1）
    - 有 CSS 滤镜（fliter）
    - 有 CSS mask 属性
    - 有 CSS mix-blend-mode 属性（不为 normal）
    - 有 CSS transform 属性（不为 none）
    - backface-visibility 属性为 hidden
    - 有 CSS reflection 属性
    - 有 CSS column-count 属性（不为 auto）或者 有 CSS column-width 属性（不为 auto）
    - 当前有对于 opacity、transform、fliter、backdrop-filter 应用动画
2. OverflowClipPaintLayer
    - overflow 不为 visible

3. NoPaintLayer
    - 不需要 paint 的 PaintLayer，比如一个没有视觉属性（背景、颜色、阴影等）的空 div。

满足以上条件的 LayoutObject 会拥有独立的渲染层，而其他的 LayoutObject 则和其第一个拥有渲染层的父元素共用一个。

**GraphicsLayers**

某些特殊的渲染层会被认为是合成层（Compositing Layers），合成层拥有单独的 GraphicsLayer，而其他不是合成层的渲染层，则和其第一个拥有 GraphicsLayer 父层公用一个。


#### GraphicsLayers

每个 GraphicsLayer 都有一个 GraphicsContext，GraphicsContext 会负责输出该层的位图，位图是存储在共享内存中，作为纹理上传到 GPU 中，最后由 GPU 将多个位图进行合成，然后 draw 到屏幕上，此时，我们的页面也就展现到了屏幕上

PaintLayer -> GraphicsLayers 的原因
* 直接原因
    * 硬件加速
    * video 元素。覆盖在 video 元素上的视频控制栏
    * 3D 或者 硬件加速的 2D Canvas 元素
        * 普通 2D Canvas 不会提升为合成层
        * 3D Canvas 提升为合成层
    * 有 3D transform
    * 对 opacity、transform、fliter、backdropfilter 应用了 animation 或者 transition（需要是 active 的 animation 或者 transition，当 animation 或者 transition 效果未开始或结束后，提升合成层也会失效）
    * will-change 设置为 opacity、transform、top、left、bottom、right（其中 top、left 等需要设置明确的定位属性，如 relative 等
* 后代元素原因
    - 有合成层后代同时本身有transform、opactiy（小于1）、mask、fliter、reflection 属性 
    - 有合成层后代同时本身 overflow 不为 visible（如果本身是因为明确的定位因素产生的 SelfPaintingLayer，则需要 z-index 不为 auto） 
    - 有合成层后代同时本身 fixed 定位 
    - 有 3D transfrom 的合成层后代同时本身有 preserves-3d 属性 
    - 有 3D transfrom 的合成层后代同时本身有 perspective 属性 
* 层重叠导致产生合成层(典型例子：z-index)



#### 层压缩
由于重叠的原因，可能随随便便就会产生出大量合成层来，而每个合成层都要消耗 CPU 和内存资源，岂不是严重影响页面性能。这一点浏览器也考虑到了，因此就有了层压缩（Layer Squashing）的处理。如果多个渲染层同一个合成层重叠时，这些渲染层会被压缩到一个 GraphicsLayer 中，以防止由于重叠原因导致可能出现的“层爆炸”。

浏览器也不是能将所有的层都进行压缩，也有一些情况无法压缩，产生层爆炸。

[demo](https://github.com/Xia-Ao/FrontendDemo/blob/master/30-CSS/13-composite/overlap.html)

![image](https://i.loli.net/2019/07/24/5d37bcef9b79726561.png)


![image](https://i.loli.net/2019/07/24/5d37d7938d39c22189.png)

层爆炸的渲染时间

![image](https://i.loli.net/2019/07/24/5d37d793a61fc20039.png)

层压缩的渲染时间

![image](https://i.loli.net/2019/07/24/5d37d793b2c5680787.png)

层压缩占用内存

![image](https://i.loli.net/2019/07/24/5d37eaa10bb4867235.png)

层爆炸占用内存

![image](https://i.loli.net/2019/07/24/5d37eaa12139987614.png)



查看合成层:[参考chrome](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)

### 性能优化思路

#### 60fps 与设备刷新率
目前大多数设备的屏幕刷新率为 60 次/秒。因此，如果在页面中有一个动画或渐变效果，或者用户正在滚动页面，那么浏览器渲染动画或页面的每一帧的速率也需要跟设备屏幕的刷新率保持一致。

其中每个帧的预算时间仅比 16 毫秒多一点 (1 秒/ 60 = 16.66 毫秒)。但实际上，浏览器有整理工作要做，因此您的所有工作需要在**10 毫秒内**完成。如果无法符合此预算，帧率将下降，并且内容会在屏幕上抖动。 此现象通常称为卡顿，会对用户体验产生负面影响。

像素管道

![image](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg)

管道的每个部分都有机会产生卡顿，因此务必准确了解您的代码触发管道的哪些部分。

不一定每帧都总是会经过管道每个部分的处理。实际上，不管是使用 JavaScript、CSS 还是网络动画，在实现视觉变化时，管道针对指定帧的运行通常有三种方式：

1. JS / CSS > 样式 > 布局 > 绘制 > 合成

完整的像素管道

![image](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg)

如果您修改元素的“layout”属性，也就是改变了元素的几何属性（例如宽度、高度、左侧或顶部位置等），那么浏览器将必须检查所有其他元素，然后“自动重排”页面。任何受影响的部分都需要重新绘制，而且最终绘制的元素需进行合成。

2. JS / CSS > 样式 > 绘制 > 合成

无布局的像素管道。

![image](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-no-layout.jpg)

如果您修改“paint only”属性（例如背景图片、文字颜色或阴影等），即不会影响页面布局的属性，则浏览器会跳过布局，但仍将执行绘制。

3. JS / CSS > 样式 > 合成

无布局或绘制的像素管道。

![image](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-no-layout-paint.jpg)

如果您更改一个既不要布局也不要绘制的属性，则浏览器将跳到只执行合成。

第三个版本开销最小，最适合于应用生命周期中的高压力点，例如动画或滚动。

#### 优化方法
1. 降低选择器的复杂性
2. 减少要计算样式的元素数量
    - 另一方面，较早的浏览器不一定针对此类任务进行了优化。应当尽可能减少声明为无效的元素的数量。
4. 尽可能避免布局操作-几何属性
5. 使用 flexbox 而不是较早的布局模型
6. 避免强制同步布局
    - 典型例子：一边读样式一边写样式。
7. 简化绘制的复杂度、减小绘制区域
    - 除 transform 或 opacity 属性之外，更改任何属性始终都会触发绘制。
    - 绘制通常是像素管道中开销最大的部分；应尽可能避免绘制。
    - 通过层的提升和动画的编排来减少绘制区域。

通过图层优化：
- 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
- 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
- 对于 transform 和 opacity 效果，不会触发 layout 和 paint


#### transform vs 普通位置改变layout

[demo](https://github.com/Xia-Ao/FrontendDemo/blob/master/30-CSS/13-composite/transform.html)

```
<style>
    body{
        height: 100vh;
        width: 100%;
        position: relative;
    }
    .container {
        position: relative;
        width: 100px;
        height: 100px;
        background: red;

        /*animation: layout 1.2s ease-in-out infinite;*/
        animation: trans 1.2s ease-in-out infinite;
    }
    .container1 {
        position: relative;
        width: 200px;
        height: 100px;
        background: yellow;
    }

    @keyframes trans {
        0% {
            -webkit-transform: translate(0);
        }
        50% {
            transform: translate(500px,500px);
        }
        100% {
            -webkit-transform: translate(0);
        }
    }

    @keyframes layout {
        0% {
            top: 0;
            left: 0;
        }
        50% {
            top: 500px;
            left: 500px;
        }
        100% {
            top: 0;
            left: 0;
        }
    }
</style>
<div class="container">
    这是一个块
</div>
<div class="container1">
    这是一个块
</div>
<div class="container">
    这是一个块
</div>
```
抓取时使用的是performance 默认的3秒钟。

使用top left定位时3s渲染时间69.2ms

![image](https://i.loli.net/2019/07/24/5d37eaa13bcf758225.png)

中间一直在render和paint

![image](https://i.loli.net/2019/07/24/5d37eaa147ed621865.png)

使用transform时 3s内渲染时间27ms，除了刚开始的渲染时间，后面没有再render和paint

![image](https://i.loli.net/2019/07/24/5d37eaa12c31169246.png)


![image](https://i.loli.net/2019/07/24/5d37eaa15287699613.png)



#### 题外话
贝贝首页图层layer

![image](https://i.loli.net/2019/07/24/5d37525b4795050466.png)

![image](https://i.loli.net/2019/07/24/5d37525b2025f86685.png)


从这里可以看到，图层还是比较多的，有些地方因为`z-index`的原因,层级非常高，比如下方导航栏，明显可以看到层级高很多。





参考来源：
- 《webkit技术内幕》-朱永盛
- [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/) - By Tali Garsiel and Paul Irish
- [CSS规范](https://www.w3.org/TR/CSS2/)
- [从Chrome源码看浏览器如何计算CSS](https://zhuanlan.zhihu.com/p/25380611) -
李银城
- [从Chrome源码看浏览器如何layout布局](https://zhuanlan.zhihu.com/p/25445527)
- [CSS属性影响](https://csstriggers.com/)
- [无线性能优化：Composite](http://taobaofed.org/blog/2016/04/25/performance-composite/)
- [chrome开发者文档](https://developers.google.com/web/fundamentals/performance/rendering/)
- [AssumedOverlap 原因分析](https://github.com/yoution/AssumedOverlap)
- [01 浏览器渲染优化](https://duola8789.github.io/2019/06/17/03%20%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/04%20%E4%BC%98%E8%BE%BE%E5%AD%A6%E5%9F%8E/01%20%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E4%BC%98%E5%8C%96/)
  