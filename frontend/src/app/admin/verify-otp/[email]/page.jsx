

import VerifyOTOPClient from "./VerifyOTPClient"


export default async function Page(props) {
         const { params } = props;
  const awaitedParams = await params;
  const email = awaitedParams.email;

const decodedEmail = decodeURIComponent(email);


return (

<>
<VerifyOTOPClient 
          email={decodedEmail} 
      />
</>
 );
}