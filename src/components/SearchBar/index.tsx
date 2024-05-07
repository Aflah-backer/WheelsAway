import { useMemo, useState } from "react";
import ReactSelect from "react-select";
import { makes } from "../../constants";
import { OptionType } from "../../types";
import { useSearchParams } from "react-router-dom";

type ButtonProps = {
  styling: string;
};

const SearchButton = ({ styling }: ButtonProps) => {
  return (
    <button className={`ml-3 z-10 ${styling}`}>
      <img src="/magnifying-glass.svg" width={40} height={40} />
    </button>
  );
};

const SearchBar = () => {
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");

  const [params, setParams] = useSearchParams();

  const searchMake = params.get("make");
  // const searchModel = params.get('model');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!make.trim() && !model.trim()) {
      return;
    }
    setParams({
      make: make.toLowerCase(),
      model: model.toLowerCase(),
    });
  };

  const options: OptionType[] = useMemo(
    () =>
      makes.map((item) => ({
        label: item,
        value: item,
      })),
    [makes]
  );

  return (
    <form onSubmit={handleSubmit} className="searchbar gap-3">
      <div className="searchbar__item text-black">
        <ReactSelect
          onChange={(e) => e && setMake(e.value)}
          options={options}
          className="w-full"
        />
        <input type="text" value={searchMake || ""} hidden />
        <SearchButton styling="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <img width={25} className="absolute ml-4" src="/model-icon.png" />
        <input
          onChange={(e) => setModel(e.target.value)}
          className="searchbar__input rounded text-black"
          type="text"
          placeholder="e.g:Civic"
        />
        <SearchButton styling="sm:hidden" />
      </div>
      <SearchButton styling="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
