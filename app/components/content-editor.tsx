"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  ArrowRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  List,
  ListOrdered,
  Image,
  MoreHorizontal,
  AlignLeft,
} from "lucide-react"

interface ContentEditorProps {
  keyword: string
  onSave: () => void
  isRegenerated?: boolean
}

export function ContentEditor({ keyword, onSave, isRegenerated = false }: ContentEditorProps) {
  // Default title based on regeneration status
  const defaultTitle = isRegenerated
    ? "Lorem Ipsum Treatment Options"
    : `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Professional Treatment Options`

  return (
    <div className="flex flex-col h-full rounded-lg border border-gray-200 bg-white overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-end gap-4">
        <div className="flex-1">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <Input
            id="title"
            defaultValue={defaultTitle}
            className="border-gray-300 focus:border-[#1a73e8] focus:ring-[#1a73e8]"
          />
        </div>
        <div>
          <Button className="bg-[#1a73e8] hover:bg-[#1557b0] text-white" onClick={onSave}>
            Save Content
          </Button>
        </div>
      </div>

      <div className="border-b border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="h-5 border-r border-gray-300 mx-1"></div>

          <select className="h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1a73e8] focus:border-[#1a73e8]">
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Heading 3</option>
            <option>Paragraph</option>
          </select>

          <div className="h-5 border-r border-gray-300 mx-1"></div>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Underline className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Strikethrough className="h-4 w-4" />
          </Button>

          <div className="h-5 border-r border-gray-300 mx-1"></div>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Code className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <Link className="h-4 w-4" />
          </Button>

          <div className="h-5 border-r border-gray-300 mx-1"></div>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <ListOrdered className="h-4 w-4" />
          </Button>

          <div className="h-5 border-r border-gray-300 mx-1"></div>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
            <AlignLeft className="h-4 w-4" />
          </Button>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {isRegenerated ? (
            // Lorem ipsum content for regenerated outlines
            <>
              <h1 className="text-2xl font-bold mb-4">Lorem Ipsum Treatment Options</h1>

              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu
                sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla
                enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat
                nisl ut dapibus.
              </p>

              <h2 className="text-xl font-bold mb-3">Understanding the Lorem Ipsum Procedure</h2>
              <p className="mb-4">
                Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper. Aenean eu leo quam.
                Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet
                fermentum. Sed posuere consectetur est at lobortis. Donec ullamcorper nulla non metus auctor fringilla.
              </p>

              <h2 className="text-xl font-bold mb-3">Benefits of Professional Lorem Ipsum Services</h2>
              <p className="mb-4">
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
                metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh.
              </p>

              <h2 className="text-xl font-bold mb-3">How Long Does Lorem Ipsum Last?</h2>
              <p className="mb-4">
                Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean
                lacinia bibendum nulla sed consectetur. Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna.
              </p>

              <h2 className="text-xl font-bold mb-3">Who is a Good Candidate for Lorem Ipsum?</h2>
              <p className="mb-4">
                Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Duis mollis, est non commodo
                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Cras mattis
                consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
                nibh.
              </p>

              <h2 className="text-xl font-bold mb-3">At-Home Lorem Ipsum Solutions</h2>
              <p className="mb-4">
                Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Aenean eu leo
                quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cum sociis natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum.
              </p>

              <h2 className="text-xl font-bold mb-3">Schedule Your Lorem Ipsum Consultation Today</h2>
              <p className="mb-4">
                Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec
                ullamcorper nulla non metus auctor fringilla. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit.
              </p>
            </>
          ) : (
            // Original content for teeth whitening
            <>
              <h1 className="text-2xl font-bold mb-4">{keyword.charAt(0).toUpperCase() + keyword.slice(1)} in NYC</h1>

              <p className="mb-4">
                Of all the cosmetic dental procedures we offer at New York Smile Institute, no treatment is as popular
                as {keyword}. It's not especially surprising given that a bright white smile is universally considered
                attractive. If the over-the-counter kits you have picked up at your local pharmacy are not getting you
                the kind of results you hoped for, a professional, in-office whitening treatment with our dentists will
                give you the most dramatic improvement in color.
              </p>

              <h2 className="text-xl font-bold mb-3">Smile with Confidence</h2>
              <p className="mb-4">
                As dental professionals it is our priority to provide quality dental care you can trust. Our {keyword}{" "}
                treatments are designed to give you the best results possible while ensuring your comfort and safety
                throughout the process.
              </p>

              <h2 className="text-xl font-bold mb-3">
                Changes You Can Expect from Professional {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
              </h2>
              <p className="mb-4">
                Following your treatment, you should notice your teeth become somewhere between five and 10 shades
                whiter than they had been before your appointment. If your teeth are yellow when you come in, please set
                your expectations accordingly. It is possible to improve the results with subsequent teeth whitening
                treatments, which are safe to repeat every few months.
              </p>

              <h2 className="text-xl font-bold mb-3">
                How Long do {keyword.charAt(0).toUpperCase() + keyword.slice(1)} Results Last?
              </h2>
              <p className="mb-4">
                Results from teeth whitening typically last around one year. If you want to extend the whiteness longer,
                we recommend avoiding foods and drinks that stain teeth, such as coffee, tea, red wine, and berries.
                Regular brushing, flossing, and dental check-ups will also help maintain your results.
              </p>

              <h2 className="text-xl font-bold mb-3">Take-Home Whitening Kits</h2>
              <p className="mb-4">
                For patients who prefer to whiten their teeth at home, we also offer professional-grade take-home
                whitening kits. These kits include custom-fitted trays and professional-strength whitening gel that is
                much more effective than over-the-counter products. Our dental team will provide you with detailed
                instructions on how to use the kit for optimal results.
              </p>

              <h2 className="text-xl font-bold mb-3">
                Schedule an Appointment for {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
              </h2>
              <p className="mb-4">
                If you're interested in brightening your smile with professional {keyword}, we invite you to schedule a
                consultation with one of our experienced dentists. During your visit, we'll assess your dental health,
                discuss your whitening goals, and recommend the best treatment option for your specific needs.
              </p>

              <p className="mb-4">
                Contact New York Smile Institute today to learn more about our {keyword} services or to schedule your
                appointment. We look forward to helping you achieve a brighter, more confident smile!
              </p>
            </>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        {/* Save button moved to top, so we can remove it from here */}
      </div>
    </div>
  )
}

