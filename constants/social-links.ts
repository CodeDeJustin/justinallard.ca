import { user } from "@/constants/user";
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
  { name: "Medium", href: user.medium, Icon: SiMedium },
  { name: "LinkedIn", href: user.linkedin, Icon: SiLinkedin },
  { name: "GitHub", href: user.github, Icon: SiGithub },
  { name: "Credly", href: user.credly, Icon: SiCredly },
  { name: "Messenger", href: user.messenger, Icon: SiMessenger },
];
