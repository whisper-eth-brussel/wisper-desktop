/* eslint-disable react/prop-types */
export const SideGroup = (props) => {
  const { group } = props;

  return (
    <div
      onClick={() => {}}
      className="border-forth cursor-pointer px-2 py-3 border-b flex items-center justify-between gap-1"
    >
      <div className="flex items-center gap-x-3 !h-8">
        {group.thumbnail ? (
          <img
            src={group.thumbnail}
            alt="Group"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-secondary"></div>
        )}
        <div className="flex flex-col justify-between">
          <h2 className="font-sora text-text-primary text-sm font-semibold">
            {group.name}
          </h2>
          <p className="text-text-primary text-opacity-60">
            {group.messages[group.messages.length - 1].message}
          </p>
        </div>
      </div>
    </div>
  );
};
