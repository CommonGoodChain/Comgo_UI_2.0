import { ProjectUploadsModule } from './project-uploads.module';

describe('ProjectUploadsModule', () => {
  let projectUploadsModule: ProjectUploadsModule;

  beforeEach(() => {
    projectUploadsModule = new ProjectUploadsModule();
  });

  it('should create an instance', () => {
    expect(projectUploadsModule).toBeTruthy();
  });
});
