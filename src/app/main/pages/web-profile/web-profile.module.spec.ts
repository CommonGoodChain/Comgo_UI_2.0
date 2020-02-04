import { WebProfileModule } from './web-profile.module';

describe('WebProfileModule', () => {
  let webProfileModule: WebProfileModule;

  beforeEach(() => {
    webProfileModule = new WebProfileModule();
  });

  it('should create an instance', () => {
    expect(webProfileModule).toBeTruthy();
  });
});
