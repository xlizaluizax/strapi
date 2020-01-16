import React from 'react';
import { FormattedMessage } from 'react-intl';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { CircleButton } from 'strapi-helper-plugin';
import { InputText } from '@buffetjs/core';
import { Plus } from '@buffetjs/icons';

import borderColor from './utils/borderColor';
import keys from './keys';
import Wrapper from './Wrapper';

const HeadersInput = ({
  errors,
  name,
  onBlur,
  onClick,
  onChange,
  onRemove,
  value,
}) => {
  const formatOption = value => ({ value: value, label: value });
  const options = keys.map(key => formatOption(key));

  const handleBlur = () => onBlur({ target: { name, value } });

  const handleChangeKey = (selected, name) => {
    if (selected === null) {
      onChange({ target: { name, value: '' } });
    } else {
      const { value } = selected;
      onChange({ target: { name, value } });
    }
  };

  const customStyles = hasError => {
    return {
      control: (base, state) => ({
        ...base,
        border: `1px solid ${borderColor({
          isFocused: state.isFocused,
          hasError,
        })} !important`,
        borderRadius: '2px !important',
      }),
      menu: base => {
        return {
          ...base,
          padding: '0',
          border: '1px solid #e3e9f3',
          borderTop: '1px solid #78caff',
          borderTopRightRadius: '0',
          borderTopLeftRadius: '0',
          borderBottomRightRadius: '3px',
          borderBottomLeftRadius: '3px',
          boxShadow: 'none',
          marginTop: '-1px;',
        };
      },
      menuList: base => ({
        ...base,
        maxHeight: '224px',
        paddingTop: '0',
      }),
      option: (base, state) => {
        return {
          ...base,
          backgroundColor:
            state.isSelected || state.isFocused ? '#f6f6f6' : '#fff',
          color: '#000000',
          fontSize: '13px',
          fontWeight: state.isSelected ? '600' : '400',
          cursor: state.isFocused ? 'pointer' : 'initial',
          height: '32px',
          lineHeight: '16px',
        };
      },
    };
  };

  return (
    <Wrapper>
      <ul>
        <li>
          <section>
            <p>
              <FormattedMessage id="Settings.webhooks.key" />
            </p>
          </section>
          <section>
            <p>
              <FormattedMessage id="Settings.webhooks.value" />
            </p>
          </section>
        </li>
        {value.map((header, index) => {
          const { key, value } = header;

          return (
            <li key={index}>
              <section>
                <CreatableSelect
                  isClearable
                  onBlur={handleBlur}
                  onChange={e => handleChangeKey(e, `${name}.${index}.key`)}
                  name={`${name}.${index}.key`}
                  options={options}
                  styles={customStyles(
                    get(errors, `headers.${index}.key`, null)
                  )}
                  value={formatOption(key)}
                />
              </section>
              <section>
                <InputText
                  onBlur={handleBlur}
                  className={
                    get(errors, `headers.${index}.value`, null) && 'bordered'
                  }
                  onChange={onChange}
                  name={`${name}.${index}.value`}
                  value={value}
                />
              </section>
              <div>
                <CircleButton
                  type="button"
                  isRemoveButton
                  onClick={() => onRemove(index)}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <button onClick={() => onClick(name)} type="button">
        <Plus fill="#007eff" width="10px" />
        <FormattedMessage id="Settings.webhooks.create.header" />
      </button>
    </Wrapper>
  );
};

HeadersInput.defaultProps = {
  errors: {},
  handleClick: () => {},
  onBlur: () => {},
  onClick: () => {},
  onRemove: () => {},
};

HeadersInput.propTypes = {
  errors: PropTypes.object,
  handleClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  value: PropTypes.array,
};

export default HeadersInput;