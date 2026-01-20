

import ResetPwdClient from './ResetPwdClient';


export default async function Page(props) {
         const { params } = props;
  const awaitedParams = await params;
  const email = awaitedParams.email;
  const otp = awaitedParams.otp;

const decodedEmail = decodeURIComponent(email);


return (
// Pass the email value down to your client component:
<>
<ResetPwdClient 
          email={decodedEmail} 
          otp={otp}
      />

</>
 );
}