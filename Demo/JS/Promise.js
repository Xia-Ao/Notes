const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.data = null;
    this.resolveCbs = [];
    this.rejectCbs = [];

    

    try {
      executor(resolve, reject);
    } catch (e) {
      reject()
    }
  }


  then(onFulfilled, onRejected) {

  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}


