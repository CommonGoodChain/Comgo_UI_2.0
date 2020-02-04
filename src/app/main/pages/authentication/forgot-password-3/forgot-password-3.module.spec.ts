import { ForgotPassword3Module } from './forgot-password-3.module';

describe('ForgotPassword3Module', () => {
  let forgotPassword3Module: ForgotPassword3Module;

  beforeEach(() => {
    forgotPassword3Module = new ForgotPassword3Module();
  });

  it('should create an instance', () => {
    expect(forgotPassword3Module).toBeTruthy();
  });
});
