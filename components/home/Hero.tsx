
function Hero() {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between w-full mt-[5vh]'>
      <div className='basis-full sm:basis-3/5'>
        <h1 className='font-azonix text-xl sm:text-2xl text-center sm:text-left w-full sm:w-[70%] mb-3 sm:mb-0'>
          Gospel Hub: <br />
          Your Ultimate Destination for Fun & Soulful Gospel PLAYLISTS!
        </h1>
      </div>
      <div className='basis-full sm:basis-2/5'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/landing-pagePic.png"
          alt="Man listening to music"
          className='w-full'
        />
      </div>
    </div>
  )
}

export default Hero