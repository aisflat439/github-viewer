import React from "react";
import { useParams } from "react-router-dom";
import { useSearch } from "../context/globalServices";

export const User = () => {
  const params = useParams();
  const { handleSubmitSearch, results, isIdle } = useSearch();
  const targetUser = results.find((user) => user.login === params.user);

  React.useEffect(() => {
    handleSubmitSearch(params.user);
  }, [params]);

  return (
    <>
      <h1 className="text-center text-3xl mb-8">View user page</h1>
      <div className="">
        {isIdle && targetUser && (
          <>
            <a href={targetUser.html_url} target="_blank">
              {targetUser.login}
            </a>
            <p>{targetUser.bio}</p>
            <p>{targetUser.stars}</p>
            <p>{targetUser.following}</p>
            <p>{targetUser.followers}</p>
            {targetUser.repos.map((repo) => {
              return <a key={repo.id}>{repo.name}</a>;
            })}
          </>
        )}
      </div>
    </>
  );
};
