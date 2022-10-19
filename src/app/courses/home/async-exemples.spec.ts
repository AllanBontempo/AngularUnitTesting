import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

describe("Async Testing Examples", () => {

  it('Asynchronous test example with Jasmine done()', (done) => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions!');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);


  });

  it('Asynchronous test exemple - setTimeout()', fakeAsync(() => {

    let test = false;

    setTimeout(() => {
      console.log('running assertions!');
      test = true;
    }, 1000);

    flush();

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test exemple - plain Promise ', fakeAsync(() => {
    let test = false;

    console.log('create promise!');

    Promise.resolve().then(() => {
      console.log('Promise evaluated succesfully!');
      test = true;
    });

    flushMicrotasks();

    console.log('Running test assertions');

    expect(test).toBeTruthy();

  }));

  it('Asynchronous test exemple - Promise  + setTimeout', fakeAsync(() =>{
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(10);

    flush();
    expect(counter).toBe(11);

  }));

  it('Asynchronous test exemple - Observables ', fakeAsync(() => {

    let test = false;

    console.log('Creatig Observable');

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    console.log('Running test assertions');

    expect(test).toBeTruthy();
  }));

});
