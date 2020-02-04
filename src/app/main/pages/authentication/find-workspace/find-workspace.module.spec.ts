import { FindWorkspaceModule } from './find-workspace.module';

describe('FindWorkspaceModule', () => {
  let findWorkspaceModule: FindWorkspaceModule;

  beforeEach(() => {
    findWorkspaceModule = new FindWorkspaceModule();
  });

  it('should create an instance', () => {
    expect(findWorkspaceModule).toBeTruthy();
  });
});
