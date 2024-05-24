import React, { forwardRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './styles.css';

export const AccordionTrigger: React.FC<React.ComponentProps<typeof Accordion.Trigger>> = forwardRef(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="AccordionHeader">
            <Accordion.Trigger
                className={classNames('AccordionTrigger', className)}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <ChevronDownIcon width={23} height={23} className="AccordionChevron" />
            </Accordion.Trigger>
        </Accordion.Header>
    )
);


export const AccordionContent: React.FC<React.ComponentProps<typeof Accordion.Content>> = forwardRef(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={classNames('AccordionContent', className)}
            {...props}
            ref={forwardedRef}
        >
            <div className="AccordionContentText">{children}</div>
        </Accordion.Content>
    )
);
