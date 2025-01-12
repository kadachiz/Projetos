import { faChartBar, faComment, faEllipsisH, faHeart, faRetweet, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function Tweet({ tweet }) {
    const [comments, setComments] = useState(0);
    const [likes, setLikes] = useState(0);
    const [retweets, setRetweets] = useState(0);

    const [isLiked, setIsLiked] = useState(false);
    const [isRetweeted, setIsRetweeted] = useState(false);
    const [isCommented, setIsCommented] = useState(false);

    function handleAction(action) {
        switch (action) {
            case 'like':
                setIsLiked((prev) => {
                    if (prev) setLikes((count) => count - 1);
                    else setLikes((count) => count + 1);
                    return !prev;
                });
                break;

            case 'retweet':
                setIsRetweeted((prev) => {
                    if (prev) setRetweets((count) => count - 1);
                    else setRetweets((count) => count + 1);
                    return !prev;
                });
                break;

            case 'comment':
                setIsCommented((prev) => {
                    if (prev) setComments((count) => count - 1);
                    else setComments((count) => count + 1);
                    return !prev;
                });
                break;

        }
    }

    return (
        <div className="border-b border-gray-800 p-4 hover:bg-gray-800 transition duration-200">
            <div className="flex space-x-3">
                <img src={tweet.avatar} alt="user avatar" className="rounded-full w-12 h-12" />
                <div className="flex-1">
                    <div className="flex item-center justify-between">
                        <div>
                            <span className="font-bold">{tweet.name}</span>
                            <span className="text-gray-500 ml-2">@{tweet.username}</span>
                            <span className="text-gray-500 ml-2">{tweet.time}</span>
                        </div>
                        <FontAwesomeIcon icon={faEllipsisH} className="text-gray-500" />
                    </div>
                    <p className="mt-2">{tweet.content}</p>
                    {tweet.image && <img src={tweet.image} className="mt-3 rounded-2xl max-w-full h-auto" alt="user image content" />}
                    <div className="flex justify-between mt-4 text-gray-500">
                        <div
                            className={`flex items-center cursor-pointer ${isCommented ? "text-blue-400" : "hover:text-blue-400"}`}
                            onClick={() => handleAction('comment')}
                        >
                            <FontAwesomeIcon icon={faComment} />
                            <span className="ml-2">{comments}</span>
                        </div>
                        <div
                            className={`flex items-center cursor-pointer ${isRetweeted ? "text-green-400" : "hover:text-green-400"}`}
                            onClick={() => handleAction('retweet')}
                        >
                            <FontAwesomeIcon icon={faRetweet} />
                            <span className="ml-2">{retweets}</span>
                        </div>
                        <div
                            className={`flex items-center cursor-pointer ${isLiked ? "text-red-400" : "hover:text-red-400"}`}
                            onClick={() => handleAction('like')}
                        >
                            <FontAwesomeIcon icon={faHeart} />
                            <span className="ml-2">{likes}</span>
                        </div>
                        <div className="flex items-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faChartBar} />
                        </div>
                        <div className="flex items-center cursor-pointer hover:text-blue-400">
                            <FontAwesomeIcon icon={faUpload} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
