import { MilestoneModule } from './milestone.module';

describe('MilestoneModule', () => {
  let milestoneModule: MilestoneModule;

  beforeEach(() => {
    milestoneModule = new MilestoneModule();
  });

  it('should create an instance', () => {
    expect(milestoneModule).toBeTruthy();
  });
});
