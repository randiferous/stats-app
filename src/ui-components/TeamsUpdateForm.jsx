/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getTeams } from "../graphql/queries";
import { updateTeams } from "../graphql/mutations";
export default function TeamsUpdateForm(props) {
  const {
    id: idProp,
    teams: teamsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    teamName: "",
    division: "",
    playedSince: "",
    venue: "",
    hometown: "",
    officialURL: "",
    abbreviation: "",
  };
  const [teamName, setTeamName] = React.useState(initialValues.teamName);
  const [division, setDivision] = React.useState(initialValues.division);
  const [playedSince, setPlayedSince] = React.useState(
    initialValues.playedSince
  );
  const [venue, setVenue] = React.useState(initialValues.venue);
  const [hometown, setHometown] = React.useState(initialValues.hometown);
  const [officialURL, setOfficialURL] = React.useState(
    initialValues.officialURL
  );
  const [abbreviation, setAbbreviation] = React.useState(
    initialValues.abbreviation
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = teamsRecord
      ? { ...initialValues, ...teamsRecord }
      : initialValues;
    setTeamName(cleanValues.teamName);
    setDivision(cleanValues.division);
    setPlayedSince(cleanValues.playedSince);
    setVenue(cleanValues.venue);
    setHometown(cleanValues.hometown);
    setOfficialURL(cleanValues.officialURL);
    setAbbreviation(cleanValues.abbreviation);
    setErrors({});
  };
  const [teamsRecord, setTeamsRecord] = React.useState(teamsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getTeams.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTeams
        : teamsModelProp;
      setTeamsRecord(record);
    };
    queryData();
  }, [idProp, teamsModelProp]);
  React.useEffect(resetStateValues, [teamsRecord]);
  const validations = {
    teamName: [],
    division: [],
    playedSince: [],
    venue: [],
    hometown: [],
    officialURL: [],
    abbreviation: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          teamName: teamName ?? null,
          division: division ?? null,
          playedSince: playedSince ?? null,
          venue: venue ?? null,
          hometown: hometown ?? null,
          officialURL: officialURL ?? null,
          abbreviation: abbreviation ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateTeams.replaceAll("__typename", ""),
            variables: {
              input: {
                id: teamsRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TeamsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Team name"
        isRequired={false}
        isReadOnly={false}
        value={teamName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamName: value,
              division,
              playedSince,
              venue,
              hometown,
              officialURL,
              abbreviation,
            };
            const result = onChange(modelFields);
            value = result?.teamName ?? value;
          }
          if (errors.teamName?.hasError) {
            runValidationTasks("teamName", value);
          }
          setTeamName(value);
        }}
        onBlur={() => runValidationTasks("teamName", teamName)}
        errorMessage={errors.teamName?.errorMessage}
        hasError={errors.teamName?.hasError}
        {...getOverrideProps(overrides, "teamName")}
      ></TextField>
      <TextField
        label="Division"
        isRequired={false}
        isReadOnly={false}
        value={division}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamName,
              division: value,
              playedSince,
              venue,
              hometown,
              officialURL,
              abbreviation,
            };
            const result = onChange(modelFields);
            value = result?.division ?? value;
          }
          if (errors.division?.hasError) {
            runValidationTasks("division", value);
          }
          setDivision(value);
        }}
        onBlur={() => runValidationTasks("division", division)}
        errorMessage={errors.division?.errorMessage}
        hasError={errors.division?.hasError}
        {...getOverrideProps(overrides, "division")}
      ></TextField>
      <TextField
        label="Played since"
        isRequired={false}
        isReadOnly={false}
        value={playedSince}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamName,
              division,
              playedSince: value,
              venue,
              hometown,
              officialURL,
              abbreviation,
            };
            const result = onChange(modelFields);
            value = result?.playedSince ?? value;
          }
          if (errors.playedSince?.hasError) {
            runValidationTasks("playedSince", value);
          }
          setPlayedSince(value);
        }}
        onBlur={() => runValidationTasks("playedSince", playedSince)}
        errorMessage={errors.playedSince?.errorMessage}
        hasError={errors.playedSince?.hasError}
        {...getOverrideProps(overrides, "playedSince")}
      ></TextField>
      <TextField
        label="Venue"
        isRequired={false}
        isReadOnly={false}
        value={venue}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamName,
              division,
              playedSince,
              venue: value,
              hometown,
              officialURL,
              abbreviation,
            };
            const result = onChange(modelFields);
            value = result?.venue ?? value;
          }
          if (errors.venue?.hasError) {
            runValidationTasks("venue", value);
          }
          setVenue(value);
        }}
        onBlur={() => runValidationTasks("venue", venue)}
        errorMessage={errors.venue?.errorMessage}
        hasError={errors.venue?.hasError}
        {...getOverrideProps(overrides, "venue")}
      ></TextField>
      <TextField
        label="Hometown"
        isRequired={false}
        isReadOnly={false}
        value={hometown}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamName,
              division,
              playedSince,
              venue,
              hometown: value,
              officialURL,
              abbreviation,
            };
            const result = onChange(modelFields);
            value = result?.hometown ?? value;
          }
          if (errors.hometown?.hasError) {
            runValidationTasks("hometown", value);
          }
          setHometown(value);
        }}
        onBlur={() => runValidationTasks("hometown", hometown)}
        errorMessage={errors.hometown?.errorMessage}
        hasError={errors.hometown?.hasError}
        {...getOverrideProps(overrides, "hometown")}
      ></TextField>
      <TextField
        label="Official url"
        isRequired={false}
        isReadOnly={false}
        value={officialURL}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamName,
              division,
              playedSince,
              venue,
              hometown,
              officialURL: value,
              abbreviation,
            };
            const result = onChange(modelFields);
            value = result?.officialURL ?? value;
          }
          if (errors.officialURL?.hasError) {
            runValidationTasks("officialURL", value);
          }
          setOfficialURL(value);
        }}
        onBlur={() => runValidationTasks("officialURL", officialURL)}
        errorMessage={errors.officialURL?.errorMessage}
        hasError={errors.officialURL?.hasError}
        {...getOverrideProps(overrides, "officialURL")}
      ></TextField>
      <TextField
        label="Abbreviation"
        isRequired={false}
        isReadOnly={false}
        value={abbreviation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              teamName,
              division,
              playedSince,
              venue,
              hometown,
              officialURL,
              abbreviation: value,
            };
            const result = onChange(modelFields);
            value = result?.abbreviation ?? value;
          }
          if (errors.abbreviation?.hasError) {
            runValidationTasks("abbreviation", value);
          }
          setAbbreviation(value);
        }}
        onBlur={() => runValidationTasks("abbreviation", abbreviation)}
        errorMessage={errors.abbreviation?.errorMessage}
        hasError={errors.abbreviation?.hasError}
        {...getOverrideProps(overrides, "abbreviation")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || teamsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || teamsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
