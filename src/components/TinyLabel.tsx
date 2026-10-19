import type { ReactNode } from 'react';

function TinyLabel({ children }: { children: ReactNode }) { return <span className="eyebrow"><span className="eyebrow-dash"/>{children}</span>; }

export default TinyLabel;
