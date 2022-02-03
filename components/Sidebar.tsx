import React, { useEffect, useState } from 'react';
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }

    return () => {};
  }, [spotifyApi]);

  return (
    <div className="h-screen p-5 overflow-y-scroll text-sm text-gray-500 border-r border-gray-900 scrollbar-hide">
      <section className="space-y-4">
        <button
          onClick={() => {
            console.log('로그아웃');
            signOut();
          }}
          className="flex items-center space-x-2 hover:text-white"
        >
          <HomeIcon className="w-5 h-5 " />
          <p>로그아웃 (임시)</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5 " />
          <p
            style={{
              backgroundColor: 'white',
            }}
            className="text-lg font-bold card"
            onClick={(e) => {
              console.log(e.currentTarget.classList);
              e.currentTarget.classList.remove('card');
              console.log(e.currentTarget.classList);
              e.currentTarget.style.pointerEvents = 'none';
            }}
          >
            Home
          </p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="w-5 h-5 " />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="w-5 h-5 " />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="w-5 h-5 " />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="w-5 h-5 " />
          <p>Liked Song</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="w-5 h-5 " />
          <p>Your Episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist */}
        {playlists.map((playlist) => (
          <p key={playlist.id} className="cursor-pointer hover:text-white">
            {playlist.name}
          </p>
        ))}
      </section>
    </div>
  );
}

export default Sidebar;
