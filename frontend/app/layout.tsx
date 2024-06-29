import React, {PropsWithChildren} from "react";

const RootLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>PraChat</title>
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout;
