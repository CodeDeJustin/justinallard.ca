import { userMediaLink } from "@/constants/userMediaLink";
import type { IconType } from "react-icons";
import {
  SiCredly,
  SiGithub,
  SiLinkedin,
  SiMedium,
  SiMessenger,
} from "react-icons/si";

export type SocialLink = {
  name: string;
  href: string;
  Icon: IconType;
};

export const socialLinks: SocialLink[] = [
  { name: "Medium", href: userMediaLink.medium, Icon: SiMedium },
  { name: "LinkedIn", href: userMediaLink.linkedin, Icon: SiLinkedin },
  { name: "GitHub", href: userMediaLink.github, Icon: SiGithub },
  { name: "Credly", href: userMediaLink.credly, Icon: SiCredly },
  { name: "Messenger", href: userMediaLink.messenger, Icon: SiMessenger },
];
