
export interface ColorInfo {
  name: string;
  hex: string;
  usage: string;
}

export interface FontPairing {
  header: string;
  body: string;
}

export interface BrandIdentity {
  palette: ColorInfo[];
  typography: FontPairing;
}

export interface LogoData {
  primary: string;
  secondaries: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
