import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

type IAppPromoProps = {
  promoText?: ReactNode;
  isLogin: Boolean;
};

const AppPromo = (props: IAppPromoProps) => {
  const router = useRouter();
  return (
    <div className="left_div relative">
      <img
        src={`${router.basePath}/assets/images/dark-logo.png`}
        alt="Dark logo"
        className="w-64"
      />
      <img src={`${router.basePath}/assets/images/Saly.png`} className="saly-img" alt="" />
      {props.promoText}
      <div className="width-100 w-2/3 pt-4 text-lg font-medium text-green">
        Find events in your area unique to your taste or onboard yourself and
        collect cash working an event!
      </div>
      {props.isLogin ? (
        <div className="pt-4 text-base font-normal text-black">
          If you don’t have an account register
        </div>
      ) : (
        <div className="pt-4 text-base font-normal text-black">
          If you already have an account
        </div>
      )}
      <div className="flex pt-1 text-base font-normal text-black">
        You can
        <div className="pl-2 text-base font-normal text-green">
          {props.isLogin ? (
            <Link href="/register" className="link-btn border-none text-green">
              Register here !
            </Link>
          ) : (
            <Link href="/" className="link-btn border-none text-green">
              Login here !
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppPromo;
