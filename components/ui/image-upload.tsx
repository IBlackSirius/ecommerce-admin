"use client"

import { useState, useEffect } from "react";
import { Button } from "./button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: any[]) => void;
  value: string[];
  isMultiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  isMultiple,
  value
}) => {


  const [resources, setResources] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (value) {
      setResources([...value])
    }
    setIsMounted(true)
  }, []);

  useEffect(() => {
    if (resources) {
      onChange(resources.map(url => {
        return {
          url
        }
      }));
    }
  }, [resources, setResources])


  const onUpload = (result: any) => {
    if (isMultiple) {
      setResources((prevResources) =>
        prevResources ? [...prevResources, result.info.secure_url] : [result.info.secure_url]
      );
    } else {
      setResources([result.info.secure_url])
    }
  };

  const onRemove = (url: string) => {
    setResources([...resources.filter(current => current !== url)])
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {resources.map(url => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => onRemove(url)} variant='destructive' size={'icon'}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset="lh4ahvp2">
        {({ open }) => {
          const onClick = () => {
            open()
          }
          return (
            <Button
              type="button"
              disabled={disabled}
              variant={'secondary'}
              onClick={onClick}
            >
              <ImagePlusIcon className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          )
        }
        }
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload