// src/components/features/footerSection/types/footer.type.ts

export interface FooterLink {
  label: string;
  url: string;
}

export interface SocialLinks {
  twitter: string;
  facebook: string;
  linkedin: string;
}

export interface Footer {
  _id: string;
  logo: string;
  description: string;
  email: string;
  phone: string;
  copyright: string;
  quickLinks: FooterLink[];
  consultingLinks: FooterLink[];
  contactLinks: FooterLink[];
  socialLinks: SocialLinks;
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface FooterResponse extends BaseResponse {
  data: Footer;
}

export interface FooterCreateRequest extends Omit<
  Footer,
  "_id" | "createdAt" | "updatedAt" | "logo"
> {
  logoFile?: File | null;
}

export interface FooterUpdateRequest extends Partial<
  Omit<Footer, "_id" | "createdAt" | "updatedAt" | "logo">
> {
  logoFile?: File | null;
}
