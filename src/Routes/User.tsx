import React from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../Components/Spinner/Spinner";
import { useSearch } from "../context/globalServices";

export const User = () => {
  const params = useParams();
  const { handleSubmitSearch, results, isIdle, handleFetchMore } = useSearch();
  const targetUser = results.find((user) => user.login === params.user);
  const isReady = isIdle && targetUser;

  React.useEffect(() => {
    handleSubmitSearch(params.user);
  }, [params]);

  return (
    <>
      <h1 className="text-center text-3xl mb-8">
        {isReady ? `${targetUser.login}'s github page` : " "}
      </h1>
      {!isIdle && <Spinner />}
      {isIdle && !targetUser && <h2>No user found, please search again!</h2>}
      {isReady && (
        <>
          <p className="text-2xl">
            User:
            <a
              href={targetUser.html_url}
              target="_blank"
              className="ml-2 border-b-2  border-teal-400"
            >
              {targetUser.login}
            </a>
          </p>
          <p>
            Description:
            <span className="ml-2">{targetUser.bio}</span>
          </p>
          <p>
            Followers:
            <span className="ml-2">{targetUser.followers}</span>
          </p>
          <p>
            Following:
            <span className="ml-2">{targetUser.following}</span>
          </p>
          <p>{targetUser.stars}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {targetUser.repos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg flex flex-col"
                >
                  <div className="flex-1">
                    <p className="uppercase text-sm font-light flex flex-row justify-between">
                      {item.name}
                      {Boolean(item.stargazers_count) && (
                        <span>{item.stargazers_count}</span>
                      )}
                    </p>
                    <p className="font-bold my-2">{item.language}</p>
                    <p className="font-light">{item.description}</p>
                  </div>
                  <a
                    className="text-teal-600 flex mt-4"
                    href={item.html_url}
                    target="_blank"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
          <button
            className="my-4 bg-teal-600 py-2 px-6 rounded-full text-white font-medium"
            onClick={() => {
              handleFetchMore(targetUser.login);
            }}
          >
            Load More
          </button>
        </>
      )}
    </>
  );
};
