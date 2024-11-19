import Image from 'next/image';

export const SocialSignInIconContainer = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <Image src={src} alt={alt} width={44} height={44} className={className} />
  );
};

export const IconContainer = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <Image src={src} alt={alt} width={24} height={24} className={className} />
  );
};

export const SmallIconContainer = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <Image src={src} alt={alt} width={16} height={16} className={className} />
  );
};
