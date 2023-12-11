/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TeamsUpdateFormInputValues = {
    teamName?: string;
    division?: string;
    playedSince?: string;
    venue?: string;
    hometown?: string;
    officialURL?: string;
    abbreviation?: string;
};
export declare type TeamsUpdateFormValidationValues = {
    teamName?: ValidationFunction<string>;
    division?: ValidationFunction<string>;
    playedSince?: ValidationFunction<string>;
    venue?: ValidationFunction<string>;
    hometown?: ValidationFunction<string>;
    officialURL?: ValidationFunction<string>;
    abbreviation?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeamsUpdateFormOverridesProps = {
    TeamsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    teamName?: PrimitiveOverrideProps<TextFieldProps>;
    division?: PrimitiveOverrideProps<TextFieldProps>;
    playedSince?: PrimitiveOverrideProps<TextFieldProps>;
    venue?: PrimitiveOverrideProps<TextFieldProps>;
    hometown?: PrimitiveOverrideProps<TextFieldProps>;
    officialURL?: PrimitiveOverrideProps<TextFieldProps>;
    abbreviation?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeamsUpdateFormProps = React.PropsWithChildren<{
    overrides?: TeamsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    teams?: any;
    onSubmit?: (fields: TeamsUpdateFormInputValues) => TeamsUpdateFormInputValues;
    onSuccess?: (fields: TeamsUpdateFormInputValues) => void;
    onError?: (fields: TeamsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeamsUpdateFormInputValues) => TeamsUpdateFormInputValues;
    onValidate?: TeamsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TeamsUpdateForm(props: TeamsUpdateFormProps): React.ReactElement;
