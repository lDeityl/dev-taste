import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import styles from './index.module.scss';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface Props {
    setValue?: (value: boolean) => void;
    setFormValue?: UseFormSetValue<any>
    label?: string;
    watch?: UseFormWatch<any>
    value?: boolean
}

const withStyle = (styleName: string) => {

    return ({ setValue, setFormValue, label, watch, value }: Props) => {
        const zodValue = watch?.(label as any);

        const setState = (confirm: boolean) => {

            setValue?.(confirm);

            setFormValue?.(label ?? "", confirm, {
                shouldValidate: true
            });

        }

        return (
            <form>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Switch.Root className={`${styles.SwitchRoot} ${styles[styleName]}`} checked={zodValue || !!value} onCheckedChange={(state: any) => setState?.(state)}>
                        <Switch.Thumb className={styles.SwitchThumb} />
                    </Switch.Root>
                </div>
            </form>
        );
    };
};
export const BlueSwitch = withStyle('blue')
export const ShellSwitch = withStyle('shell')
export const DarkSwitch = withStyle('dark')
export const PurpleSwitch = withStyle('purple')
export const PinkSwitch = withStyle('pink')
