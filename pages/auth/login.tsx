import React from 'react';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import Image from 'next/image';

type LogInProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
};

/**
 * 로그인 페이지
 * @param param0
 * @returns
 */
function Login({ providers }: LogInProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-neutral-900">
        <div className="relative mb-5 w-52 h-52">
          <Image src="https://links.papareact.com/9xl" layout="fill" alt="Login_Logo" priority />
        </div>

        <section className="">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="bg-[#18D860] p-5 text-white rounded-full"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Login with {provider.name}
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

export default Login;
