import { YourWorkspaceModule } from './your-workspace.module';

describe('YourWorkspaceModule', () => {
  let yourWorkspaceModule: YourWorkspaceModule;

  beforeEach(() => {
    yourWorkspaceModule = new YourWorkspaceModule();
  });

  it('should create an instance', () => {
    expect(yourWorkspaceModule).toBeTruthy();
  });
});
