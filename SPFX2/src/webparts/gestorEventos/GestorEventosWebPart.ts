import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";

import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import GestorDeEventosWebPart, {
  IEventoWebpartProps,
} from "./components/GestorDeEventosWebPart";
import { SPFI, SPFx, spfi } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface IGestorDeEventosWebpartWebPartProps {
  description: string;
}

export default class GestorDeEventosWebpartWebPart extends BaseClientSideWebPart<IGestorDeEventosWebpartWebPartProps> {
  private SP: SPFI;

  public render(): void {
    const webpartProps = {
      SP: this.SP,
      WebPartContext: this.context,
    };
    const element: React.ReactElement<IEventoWebpartProps> =
      React.createElement(GestorDeEventosWebPart, webpartProps);
    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this.SP = spfi().using(SPFx(this.context));
    try {
      return super.onInit();
    } catch (error) {
      console.error(error);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

}
