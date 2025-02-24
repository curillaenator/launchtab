interface LaunchSpaceProps {
  spaceCode: string;
  createdAt: number;
  createdBy: string;
  name: string;
  units: string[];
}

interface LaunchUnitProps {
  unitCode: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  body: string;
}

export type { LaunchSpaceProps, LaunchUnitProps };
