# Malla Reddy School — Blog Image Generation & Visual Branding Rules

This rule defines the official visual branding, student photography standards, uniform specifications, logo implementation workflow, and visual quality audit gates for all blog post images on the Malla Reddy School website.

---

## 1. Topic-Specific & Unique Images Requirement
- Every new blog post MUST have a **completely unique image** specially created for that specific topic.
- Do not reuse images from other blogs or make trivial recolors/re-crops.
- Avoid generic stock-style school photography that lacks brand identity.

---

## 2. Three Visual Sources of Truth

### Reference 1: Student Photography Style
- **Visual Feel**: Photorealistic, natural South Asian/Indian student photography.
- **Lighting**: Bright, natural, professional school marketing photography.
- **Atmosphere**: Authentic classroom, lab, library, sports ground, or campus setting with natural student expressions.

### Reference 2: Official Malla Reddy School Uniform
Whenever Malla Reddy School students are depicted in school context:
- **Blazer**: Dark navy blue blazer.
- **Shirt**: Sky-blue / light blue formal collared shirt.
- **Tie**: Navy blue tie with red and blue diagonal stripes.
- **Pocket Crest**: Official Malla Reddy School emblem embroidered on the left blazer pocket.
- **Prohibitions**: No black/grey blazers, plain red ties, casual wear in formal scenes, or generic badges.

### Reference 3: Official Malla Reddy School Logo
- **Design Elements**: Double circular ring, `MALLA REDDY SCHOOL` text along top arc, `MEDCHAL` in orange at bottom, central stylized M / open book icon with student dot, left and right stars, outer laurel wreath.
- **Strict Rule**: AI image generators must NOT invent or approximate the logo. The official vector/raster asset must be composited onto surfaces.

---

## 3. Logo Implementation Workflow (4 Steps)
1. **Generate Clean Scene**: Generate the background/student photo without prompting for text or logos on clothes/walls.
2. **Retrieve Official Asset**: Use the clean high-resolution logo asset (`public/logo.png`).
3. **Composite Logo**: Overlay the logo onto pocket, wall, or banner location.
4. **Blend & Texture**: Adjust perspective, scale, lighting, shadow, and texture (fabric weave for pockets, paint finish for walls).

---

## 4. Image Type Classification
- **TYPE A — Student / People Photography**: Used for student life, classroom activities, science experiments, sports, debates, art workshops, leadership.
- **TYPE B — Infrastructure Photography**: Used for campus facilities, smart classrooms, computer/AI labs, composite science labs, library, campus grounds.
- **TYPE C — Ghibli / Hand-Painted Educational Illustration**: Selective use for conceptual, storytelling, imagination, and reading habit blogs.

---

## 5. Audit & Quality Gate Checklist
Before assigning an image to any blog:
1. Are student facial features, hands, and fingers anatomically natural (no AI artifacts)?
2. Does the uniform strictly match (navy blazer, sky blue shirt, striped tie)?
3. Is the logo accurate, correctly scaled, and properly integrated into the pocket/surface?
4. Is the scene directly relevant to the blog topic?
5. If any check fails $\rightarrow$ REGENERATE or apply FALLBACK (switch to Infrastructure or Ghibli illustration).
