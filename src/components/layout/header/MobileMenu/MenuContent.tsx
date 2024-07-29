import clsx from 'clsx';
import { MenuItem, Text, useDevice } from '@deriv-com/ui';
import { PlatformSwitcher } from '../PlatformSwitcher';
import { MobileMenuConfig } from './MobileMenuConfig';

export const MenuContent = () => {
    const { isDesktop } = useDevice();
    const textSize = isDesktop ? 'sm' : 'md';

    return (
        <div className='mobile-menu__content'>
            <div className='mobile-menu__content__platform'>
                <PlatformSwitcher />
            </div>

            <div className='mobile-menu__content__items'>
                {MobileMenuConfig().map((item, index) => {
                    const removeBorderBottom = item.find(({ removeBorderBottom }) => removeBorderBottom);

                    return (
                        <div
                            className={clsx('mobile-menu__content__items--padding', {
                                'mobile-menu__content__items--bottom-border': !removeBorderBottom,
                            })}
                            data-testid='dt_menu_item'
                            key={index}
                        >
                            {item.map(({ LeftComponent, RightComponent, as, href, label, onClick, target }) => {
                                if (as === 'a') {
                                    return (
                                        <MenuItem
                                            as='a'
                                            className='mobile-menu__content__items__item'
                                            disableHover
                                            href={href}
                                            key={label}
                                            leftComponent={
                                                <LeftComponent
                                                    className='mobile-menu__content__items--right-margin'
                                                    height={16}
                                                    width={16}
                                                />
                                            }
                                            target={target}
                                        >
                                            <Text size={textSize}>{label}</Text>
                                        </MenuItem>
                                    );
                                }
                                return (
                                    <MenuItem
                                        as='button'
                                        className='mobile-menu__content__items__item'
                                        disableHover
                                        key={label}
                                        leftComponent={
                                            <LeftComponent
                                                className='mobile-menu__content__items--right-margin'
                                                iconSize='xs'
                                            />
                                        }
                                        onClick={onClick}
                                        rightComponent={RightComponent}
                                    >
                                        <Text size={textSize}>{label}</Text>
                                    </MenuItem>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
