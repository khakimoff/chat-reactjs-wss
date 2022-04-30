import Picker from 'emoji-picker-react';

function Emoji({ hidden, onEmojiClick }) {
  return (
    <div hidden={hidden}>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );

};

export default Emoji;

