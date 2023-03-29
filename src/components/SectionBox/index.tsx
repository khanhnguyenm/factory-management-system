import { Typography } from "@mui/material";
import { ReactNode } from "react";
import "./style.scss";

export interface SectionBoxProps {
  children: ReactNode;
  heading: string;
}

export default function SectionBox({ children, heading }: SectionBoxProps) {
  return (
    <section className="section">
      <Typography component="h2" className="heading-style" gutterBottom>
        {heading}
      </Typography>
      {children}
    </section>
  );
}
