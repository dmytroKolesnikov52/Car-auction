import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-8xl px-4 py-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 shadow-2xl">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-yellow-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative grid gap-10 p-4 pl-10 grid-cols-2 items-center">
            <div>
              <h1 className=" text-5xl font-extrabold tracking-tight text-white">
                Знайди своє авто на <br />
                <span className="text-yellow-400">Car Auction</span>
              </h1>

              <p className="mt-4 text-gray-300 text-lg">
                Підбір, перевірка, доставка - все в одному місці. <br /> Обирай
                авто з аукціону або машину під ключ, і ми підберемо найкращий
                шлях до твого гаражу.
              </p>

              <div className="mt-5 flex flex-row gap-3 items-center">
                <Link
                  to="/order"
                  className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition-all hover:bg-yellow-300 active:scale-[0.99]"
                >
                  Авто на замовлення
                </Link>

                <Link
                  to="/auction"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.99]"
                >
                  Перейти до аукціону
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    Популярні авто
                  </p>
                </div>

                <div className="mt-5 grid grid-rows-4 grid-flow-col gap-3">
                  {[
                    {
                      title: 'BMW 3 Series',
                      meta: '2018 / 2.0 / Автомат',
                      price: '10 900 $',
                    },
                    {
                      title: 'Audi A4',
                      meta: '2017 / 2.0 / Quattro',
                      price: '11 500 $',
                    },
                    {
                      title: 'Volkswagen Passat',
                      meta: '2019 • 1.8 • DSG',
                      price: '9 800 $',
                    },
                    {
                      title: 'BMW 4 Series',
                      meta: '2018 / 2.0 / Автомат',
                      price: '10 900 $',
                    },
                    {
                      title: 'BMW 5 Series',
                      meta: '2018 / 2.0 / Автомат',
                      price: '10 900 $',
                    },
                    {
                      title: 'BMW 6 Series',
                      meta: '2018 / 2.0 / Автомат',
                      price: '10 900 $',
                    },
                    {
                      title: 'BMW 7 Series',
                      meta: '2018 / 2.0 / Автомат',
                      price: '10 900 $',
                    },
                    {
                      title: 'BMW 8 Series',
                      meta: '2018 / 2.0 / Автомат',
                      price: '10 900 $',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="group flex items-center justify-between cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all hover:bg-white/10"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-300">{item.meta}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold text-yellow-400">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
