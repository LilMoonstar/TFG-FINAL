import * as React from "react";
import { Combobox, Option, makeStyles, useId } from "@fluentui/react-components";
import { CampeonesItem } from "../../../Campeones/CampeonesItem";
import type { ComboboxProps } from "@fluentui/react-components";
import { UsuariosItem } from "../UsuariosItem";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    maxWidth: "400px",
  },
});

interface UsuariosComboBoxProps extends Partial<ComboboxProps> {
  fotos: CampeonesItem[];
  Item: UsuariosItem;
  onComboboxChange?: (updatedChampions: { Description: string, Url: string }) => void;
}

const UsuariosComboBox: React.FC<UsuariosComboBoxProps> = ({ fotos, Item, onComboboxChange, ...props }) => {
  const styles = useStyles();
  const comboId = useId("combo-default");
  const options = fotos.map((F) => ({
    key: F.ID,
    text: F.Nombre.split('_')[0],
    data: F
  }));

  const onChange: ComboboxProps["onChange"] = (event) => {
    const value = event.target.value.trim();
    const matches = fotos.filter(
      (foto) => foto.Nombre.toLowerCase().indexOf(value.toLowerCase()) === 0
    );
    if (matches.length === 1) {
      const selectedFoto = matches[0];
      const updatedChampions = {
        Description: selectedFoto.Nombre.split('_')[0],
        Url: selectedFoto.URL
      };
      onComboboxChange?.(updatedChampions); 
    }
  };
  
  const onOptionSelect: ComboboxProps["onOptionSelect"] = (event, data) => {
    if (data && data.optionText) {
      const selectedFoto = fotos.find((foto) => foto.Nombre === data.optionText);
      if (selectedFoto) {
        const updatedChampions = {
          Description: selectedFoto.Nombre.split('_')[0],
          Url: selectedFoto.URL
        };
        onComboboxChange?.(updatedChampions);
      }
    }
  };

  return (
    <div className={styles.root}>
      <Combobox
        aria-labelledby={comboId}
        placeholder="Seleccione un campeón"
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        {...props}
      >
        {options.map((option) => (
          <Option key={option.key} text={option.text}>
            {option.text}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};

export default UsuariosComboBox;
