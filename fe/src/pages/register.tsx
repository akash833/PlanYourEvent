import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import AppPromo from './components/app-promo';
import RegisterForm from './components/register-form';

const RegisterPromoText = () => (
  <div className="cu-shadow text-5xl font-semibold text-black">
    <p>The Easiest way to Book and Staff your Own events</p>
  </div>
);

const Register = () => (
  <Main meta={<Meta title="Register" description="Register Form" />}>
    <div className="container-fluid login flex-column mx-auto flex gap-4 p-16 pr-0 pt-10">
      <AppPromo isLogin={false} promoText={<RegisterPromoText />} />
      <div className="right_div">
        <main className="content text-xl">
          <RegisterForm />
        </main>
      </div>
    </div>
  </Main>
);

export default Register;
