import React from 'react';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn as SignInToProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import Image from 'next/image';

type LogInProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
};

function LogIn({ providers }: LogInProps) {
  return (
    <>
      <div className="">
        <div className="relative mb-5 w-52 h-52">
          <Image src="https://links.papareact.com/9xl" layout="fill" alt="Login_Logo" priority />
        </div>
        <p>This is not a Real App. It is built for educational purpose only 😊</p>

        <section className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 text-white rounded-lg bg-slate-600"
                onClick={() => SignInToProvider(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default LogIn;
