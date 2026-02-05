"use client";

import { createClient } from "@supabase/supabase-js";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Inicializa o cliente do Supabase apenas no navegador
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ImageUploadProps {
  defaultValue?: string; // Para quando estivermos editando (já tem foto)
  name: string; // Nome do campo para o formulário (ex: "coverImage")
}

export function ImageUpload({ defaultValue = "", name }: ImageUploadProps) {
  const [preview, setPreview] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Selecione uma imagem para fazer upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      // Cria um nome único para não substituir arquivos iguais
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Envia para o Supabase
      const { error: uploadError } = await supabase.storage
        .from("media") // Nome do seu bucket
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Pega a URL pública para salvar no banco
      const { data } = supabase.storage.from("media").getPublicUrl(filePath);

      setPreview(data.publicUrl);
    } catch (error) {
      alert("Erro ao fazer upload da imagem!");
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  function removeImage() {
    setPreview("");
  }

  return (
    <div className="w-full">
      {/* Campo Escondido que guarda a URL real para o formulário salvar */}
      <input type="hidden" name={name} value={preview} />

      {preview ? (
        // === MODO VISUALIZAÇÃO (Já tem foto) ===
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-slate-200 group">
          <Image 
            src={preview} 
            alt="Preview" 
            fill 
            className="object-cover" 
          />
          {/* Botão de Remover */}
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remover imagem"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        // === MODO UPLOAD (Botão para enviar) ===
        <label className={`
          flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition
          ${uploading ? "border-blue-400 bg-blue-50 cursor-wait" : "border-slate-300"}
        `}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                <p className="text-sm text-slate-500">Enviando imagem...</p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 mb-3 text-slate-400" />
                <p className="mb-2 text-sm text-slate-500 font-semibold">Clique para enviar imagem</p>
                <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF</p>
              </>
            )}
          </div>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleUpload} 
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}