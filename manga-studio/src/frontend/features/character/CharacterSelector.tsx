import { useCharacterStore } from "./characterStore";

interface CharacterSelectorProps {
  selectedCharacterIds: string[];
  onChange: (ids: string[]) => void;
}

export function CharacterSelector({ selectedCharacterIds, onChange }: CharacterSelectorProps) {
  const { characters } = useCharacterStore();

  const toggleCharacter = (id: string) => {
    if (selectedCharacterIds.includes(id)) {
      onChange(selectedCharacterIds.filter((cid) => cid !== id));
    } else {
      onChange([...selectedCharacterIds, id]);
    }
  };

  if (characters.length === 0) {
    return (
      <p className="text-xs text-gray-500">暂无角色，请先在角色库中创建</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {characters.map((char) => (
        <button
          key={char.id}
          className={`rounded px-2 py-0.5 text-xs transition-colors ${
            selectedCharacterIds.includes(char.id)
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-400 hover:bg-gray-600"
          }`}
          onClick={() => toggleCharacter(char.id)}
        >
          {char.name}
        </button>
      ))}
    </div>
  );
}
