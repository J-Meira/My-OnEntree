import { ReactNode, useEffect, useState } from 'react';

import { Box, ScaleFade } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
}

export const PublicContainer = ({
  children,
  className = '',
  size = 'sm',
  showLogo = true,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    return () => {
      setIsOpen(false);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <Box className={'public-container scroll-y ' + className}>
      <Box className={'container-box container-box-' + size}>
        {showLogo && (
          <ScaleFade initialScale={0.8} in={isOpen}>
            <Box className='logo'>
              <img src='/assets/logos/variation.svg' alt='Logo Sigep' />
            </Box>
          </ScaleFade>
        )}
        <ScaleFade initialScale={0.8} in={isOpen}>
          <Box
            className={'container-content'}
            p='40px'
            // color='white'
            mt='4'
            // bg='teal.500'
            rounded='md'
            shadow='md'
          >
            {children}
          </Box>
        </ScaleFade>
      </Box>
    </Box>
  );
};
