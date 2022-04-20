import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); //Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        {Object.entries(userInfo).map((claimEntry) => {
          const claimName = claimEntry[0];
          const claimValue = claimEntry[1];
          const claimId = `claim-${claimName}`;
          return (
            <>
              <div>Claim Name{claimName}</div>
              <div>{claimValue.toString()}</div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
