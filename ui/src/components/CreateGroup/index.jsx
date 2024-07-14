/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosLink } from "react-icons/io";

import { MdEdit } from "react-icons/md";
import { Button } from "../common/Button";
import { useDispatch } from "react-redux";
import { newChat } from "../../store/slices/group";
import { openChat } from "../../store/slices/chat";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { setCreateScreen } from "../../store/slices/createScreen";

const CreateGroup = () => {
  const [image, setImage] = useState(null);

  const [name, setName] = useState("");

  const [members, setMembers] = useState(1);

  const [limitMembers, setLimitMembers] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toast = useToast();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("https://chat-app.com/join/123456");
    return toast({
      title: "Copied",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handler = () => {
    if (!name)
      return toast({
        title: "Group name is required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

    if (!image) {
      return toast({
        title: "Group image is required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    dispatch(
      newChat({
        id: "5",
        name: name,
        thumbnail: image,
        time: "12:00",
        link: "/group/5",
        members: [],
        messages: [],
      })
    );
    dispatch(
      openChat({
        id: "5",
        name: name,
        thumbnail: image,
        members: [],
        link: "/group/5",
        messages: [],
      })
    );
    dispatch(setCreateScreen(false));
    navigate("/group");
  };

  return (
    <div className="p-10 flex flex-col">
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl">Create a group</h1>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="relative w-fit">
              {!image && (
                <MdEdit className="absolute text-third top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}

              {image ? (
                <img
                  src={image}
                  alt="Group"
                  className="w-[100px] border-2 border-forth h-[100px] rounded-full"
                />
              ) : (
                <div className="w-[100px] border-2 border-forth h-[100px] bg-gray-200 rounded-full"></div>
              )}
              <input
                accept="image/*"
                type="file"
                className={`opacity-0 absolute inset-0`}
                onChange={(e) => handleFileUpload(e)}
              />
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Group name"
              className="text-center border-2 border-forth rounded-md px-3 py-2"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col w-[400px] gap-2">
            <div className="px-4 py-3 flex items-center justify-between">
              <input
                type="checkbox"
                onChange={(e) => setLimitMembers(e.target.checked)}
              />
              <h5 className="text-text-primary text-sm font-normal">
                Limit of members
              </h5>
              <div
                className={`flex items-center justify-center gap-x-3 ${
                  !limitMembers
                    ? "opacity-35 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <button
                  onClick={() => {
                    if (members > 1) setMembers(members - 1);
                  }}
                  className="text-xl"
                >
                  -
                </button>
                <span className="text-xl">{members}</span>
                <button
                  onClick={() => {
                    setMembers(members + 1);
                  }}
                  className="text-xl"
                >
                  +
                </button>
              </div>
            </div>
            <div
              onClick={handleCopy}
              className="px-4 cursor-pointer py-3 flex items-center justify-between"
            >
              <h5 className="text-text-primary text-sm font-normal">
                Bağlantıyla gruba davet et
              </h5>
              <div className="p-2 flex items-center justify-center">
                <IoIosLink size={18} className="text-text-primary" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-12 justify-center">
          <Button handler={handler} text="Join Group" />
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
