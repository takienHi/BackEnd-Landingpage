export type LogoType = {
  desktop: {
    while: string;
    dark: string;
  };
  mobile: {
    while: string;
    dark: string;
  };
  favicon: string;
};

export const LogoDefault: LogoType = {
  desktop: {
    while: '',
    dark: '',
  },
  mobile: {
    while: '',
    dark: '',
  },
  favicon: '',
};
