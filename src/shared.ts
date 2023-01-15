const sharedConfig = {} as ProjectInfo;

export interface ProjectInfo {
  readonlyAccessToken: string;
  appCenterAppName: string;
  appCenterOrgName: string;
}

export const configurateProject = (config: ProjectInfo) => {
  Object.assign(sharedConfig, config);
};

export const getConfig = (): ProjectInfo => {
  return {...sharedConfig};
};
