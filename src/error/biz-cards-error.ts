class BizCardsError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    // this.name = this.constructor.name; //BizCardsError
    this.status = status;
  }
}
export { BizCardsError };
