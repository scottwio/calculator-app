import { calculatorManager, symbols } from "./calculatorManager";

describe("calculator manager", () => {
  beforeEach(() => {
    calculatorManager.update(symbols.clear);
  });

  it("should correctly minus a value", done => {
    calculatorManager.update(1940);
    calculatorManager.update(symbols.minus);
    calculatorManager.update(123);
    calculatorManager.update(symbols.equals);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("1817");
        done();
      })
      .unsubscribe();
  });

  it("should correctly plus a value", done => {
    calculatorManager.update(19);
    calculatorManager.update(symbols.plus);
    calculatorManager.update(20);
    calculatorManager.update(symbols.equals);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("39");
        done();
      })
      .unsubscribe();
  });

  it("should correctly times a value", done => {
    calculatorManager.update(10);
    calculatorManager.update(symbols.times);
    calculatorManager.update(10);
    calculatorManager.update(symbols.equals);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("100");
        done();
      })
      .unsubscribe();
  });

  it("should correctly divide a value", done => {
    calculatorManager.update(106);
    calculatorManager.update(symbols.divide);
    calculatorManager.update(4);
    calculatorManager.update(symbols.equals);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("26.5");
        done();
      })
      .unsubscribe();
  });

  it("should correctly clear values", done => {
    calculatorManager.update(102);
    calculatorManager.update(symbols.divide);
    calculatorManager.update(4);
    calculatorManager.update(symbols.equals);
    calculatorManager.update(symbols.clear);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("0");
        done();
      })
      .unsubscribe();
  });

  it("should support decimal places via symbols", done => {
    calculatorManager.update(1);
    calculatorManager.update(symbols.decimal);
    calculatorManager.update(4);
    calculatorManager.update(symbols.plus);
    calculatorManager.update(6);
    calculatorManager.update(symbols.decimal);
    calculatorManager.update(9);
    calculatorManager.update(symbols.equals);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("8.3");
        done();
      })
      .unsubscribe();
  });

  it("should clear if pressing a number directly after equal", done => {
    calculatorManager.update(10);
    calculatorManager.update(symbols.plus);
    calculatorManager.update(9);
    calculatorManager.update(symbols.equals);
    calculatorManager.update(4);
    calculatorManager.update(symbols.plus);
    calculatorManager.update(4);
    calculatorManager.update(symbols.equals);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("8");
        done();
      })
      .unsubscribe();
  });

  it("should be able to enter multiple calculations", done => {
    calculatorManager.update(19);
    calculatorManager.update(symbols.plus);
    calculatorManager.update(20);
    calculatorManager.update(symbols.equals);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("39");
      })
      .unsubscribe();
    calculatorManager.update(symbols.minus);
    calculatorManager.update(20);
    calculatorManager.update(symbols.equals);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("19");
      })
      .unsubscribe();
    calculatorManager.update(symbols.times);
    calculatorManager.update(9);
    calculatorManager.update(symbols.equals);
    calculatorManager.total$
      .subscribe(x => {
        expect(x).toBe("171");
        done();
      })
      .unsubscribe();
  });
});
