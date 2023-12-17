import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

import AppPromo from "./components/app-promo";
import ForgetForm from "./components/forget-form";

const LoginPromoText = () => (
  <div className="cu-shadow pt-4 text-5xl font-semibold text-black">
    <p>Party with Friends Network with locals Staff Your Events Seamlessly</p>
  </div>
);

const Index = () => (
  <Main meta={<Meta title="Forget Password" description="Forget form" />}>
    <div className="container-fluid login  flex-column loginPT mx-auto flex gap-4 p-16 pt-10">
      <AppPromo isLogin promoText={<LoginPromoText />} />
      <div className="right_div">
        <main className="content text-xl">
          <ForgetForm />
        </main>
      </div>
    </div>
  </Main>
);

export default Index;
